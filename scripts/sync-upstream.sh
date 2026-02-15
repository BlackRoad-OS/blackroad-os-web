#!/bin/bash
# scripts/sync-upstream.sh
# Helper script for managing BlackRoad-Private upstream synchronization

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
UPSTREAM_REMOTE="upstream"
UPSTREAM_URL="https://github.com/BlackRoad-OS/BlackRoad-Private.git"
UPSTREAM_BRANCH="${1:-main}"

# Functions
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

print_header() {
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  ${1}${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
    echo ""
}

check_git_status() {
    if [ -n "$(git status --porcelain)" ]; then
        print_error "Working directory is not clean. Commit or stash your changes first."
        exit 1
    fi
}

setup_upstream() {
    print_header "Setting Up Upstream Remote"
    
    # Check if upstream already exists
    if git remote | grep -q "^${UPSTREAM_REMOTE}$"; then
        print_info "Upstream remote already exists"
        CURRENT_URL=$(git remote get-url upstream)
        
        if [ "$CURRENT_URL" != "$UPSTREAM_URL" ]; then
            print_warning "Updating upstream URL from $CURRENT_URL to $UPSTREAM_URL"
            git remote set-url upstream "$UPSTREAM_URL"
        fi
    else
        print_info "Adding upstream remote: $UPSTREAM_URL"
        git remote add upstream "$UPSTREAM_URL"
    fi
    
    print_success "Upstream remote configured"
    echo ""
    git remote -v | grep upstream
}

fetch_upstream() {
    print_header "Fetching from Upstream"
    
    print_info "Fetching branch: $UPSTREAM_BRANCH"
    
    if git fetch upstream "$UPSTREAM_BRANCH" 2>&1; then
        print_success "Successfully fetched from upstream"
        return 0
    else
        print_error "Failed to fetch from upstream"
        print_warning "This may be due to:"
        echo "  - Repository doesn't exist"
        echo "  - You don't have access (requires team membership)"
        echo "  - Network connectivity issues"
        echo ""
        echo "Contact blackroad.systems@gmail.com for access"
        return 1
    fi
}

check_status() {
    print_header "Checking Sync Status"
    
    # Get current branch
    CURRENT_BRANCH=$(git branch --show-current)
    print_info "Current branch: $CURRENT_BRANCH"
    
    # Count commits ahead/behind
    AHEAD=$(git rev-list --count upstream/$UPSTREAM_BRANCH..$CURRENT_BRANCH 2>/dev/null || echo "0")
    BEHIND=$(git rev-list --count $CURRENT_BRANCH..upstream/$UPSTREAM_BRANCH 2>/dev/null || echo "0")
    
    echo ""
    echo "Status relative to upstream/$UPSTREAM_BRANCH:"
    echo "  Commits ahead:  $AHEAD"
    echo "  Commits behind: $BEHIND"
    echo ""
    
    if [ "$BEHIND" -gt "0" ]; then
        print_warning "You are $BEHIND commits behind upstream"
        echo ""
        echo "Recent upstream commits:"
        git log --oneline --graph --decorate -n 5 upstream/$UPSTREAM_BRANCH ^$CURRENT_BRANCH
    else
        print_success "Up to date with upstream"
    fi
}

sync_upstream() {
    print_header "Syncing with Upstream"
    
    check_git_status
    
    # Get current branch
    CURRENT_BRANCH=$(git branch --show-current)
    
    # Create sync branch
    SYNC_BRANCH="sync-upstream-$(date +%Y%m%d-%H%M%S)"
    print_info "Creating sync branch: $SYNC_BRANCH"
    git checkout -b "$SYNC_BRANCH"
    
    # Attempt merge
    print_info "Merging upstream/$UPSTREAM_BRANCH"
    
    if git merge upstream/$UPSTREAM_BRANCH --no-edit; then
        print_success "Successfully merged upstream changes"
        echo ""
        print_info "Next steps:"
        echo "  1. Review the changes: git log --oneline -n 10"
        echo "  2. Test the build: npm run build"
        echo "  3. Push changes: git push -u origin $SYNC_BRANCH"
        echo "  4. Create PR: gh pr create --title 'Sync from upstream'"
    else
        print_error "Merge conflicts detected"
        echo ""
        print_info "Resolving conflicts:"
        echo "  1. Check conflicts: git status"
        echo "  2. Edit conflicting files"
        echo "  3. Stage resolved files: git add <files>"
        echo "  4. Complete merge: git commit"
        echo ""
        echo "Or abort merge: git merge --abort"
        
        # Show conflicting files
        echo ""
        echo "Conflicting files:"
        git diff --name-only --diff-filter=U
    fi
}

view_changes() {
    print_header "Viewing Upstream Changes"
    
    BEHIND=$(git rev-list --count HEAD..upstream/$UPSTREAM_BRANCH 2>/dev/null || echo "0")
    
    if [ "$BEHIND" -eq "0" ]; then
        print_success "No new changes in upstream"
        return
    fi
    
    print_info "Showing $BEHIND commits from upstream"
    echo ""
    
    git log --oneline --graph --decorate HEAD..upstream/$UPSTREAM_BRANCH
    
    echo ""
    read -p "View detailed diff? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git log -p HEAD..upstream/$UPSTREAM_BRANCH
    fi
}

show_help() {
    cat << EOF
BlackRoad-Private Upstream Sync Helper

Usage: $0 [command] [branch]

Commands:
  setup       Set up upstream remote
  fetch       Fetch from upstream
  status      Check sync status
  sync        Sync changes from upstream (creates new branch)
  view        View upstream changes
  help        Show this help message

Arguments:
  branch      Upstream branch to sync (default: main)

Examples:
  $0 setup
  $0 fetch
  $0 status
  $0 sync
  $0 sync develop
  $0 view

For more information, see docs/UPSTREAM.md
EOF
}

# Main script
main() {
    COMMAND="${1:-help}"
    
    case $COMMAND in
        setup)
            setup_upstream
            ;;
        fetch)
            setup_upstream
            fetch_upstream
            ;;
        status)
            setup_upstream
            if fetch_upstream; then
                check_status
            fi
            ;;
        sync)
            setup_upstream
            if fetch_upstream; then
                sync_upstream
            fi
            ;;
        view)
            setup_upstream
            if fetch_upstream; then
                view_changes
            fi
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $COMMAND"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main with all arguments
main "$@"
