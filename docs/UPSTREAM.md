# 🔄 BlackRoad-Private Upstream Connection

This document explains how **blackroad-os-web** connects to and synchronizes with the **BlackRoad-Private** upstream repository.

## 📋 Overview

BlackRoad-Private is the private upstream repository containing:
- Advanced features and experimental code
- Internal development work
- Pre-release features
- Sensitive configurations and integrations

This public repository (`blackroad-os-web`) periodically syncs changes from BlackRoad-Private after they've been reviewed and approved for public release.

## 🔐 Access Requirements

Access to BlackRoad-Private requires:
- BlackRoad OS team membership
- Appropriate GitHub permissions
- Valid authentication token

**Contact:** blackroad.systems@gmail.com for access requests

## 🚀 Quick Start

### For Team Members with Access

```bash
# Add the upstream remote
git remote add upstream https://github.com/BlackRoad-OS/BlackRoad-Private.git

# Verify configuration
git remote -v

# Fetch from upstream
git fetch upstream

# View upstream branches
git branch -r | grep upstream
```

### For External Contributors

External contributors work only with the public `blackroad-os-web` repository. Changes are merged from upstream by the core team.

## 🔄 Synchronization Workflow

### Automatic Sync

The repository includes automated upstream synchronization:

1. **Scheduled Checks:** Daily at 2 AM UTC
2. **Change Detection:** Compares with upstream/main
3. **PR Creation:** Automatically creates PRs for new changes
4. **Conflict Handling:** Creates issues if conflicts detected

See `.github/workflows/sync-upstream.yml` for details.

### Manual Sync

Team members can manually sync changes:

```bash
# 1. Fetch latest from upstream
git fetch upstream

# 2. Create a sync branch
git checkout -b sync-upstream-$(date +%Y%m%d)

# 3. Merge upstream changes
git merge upstream/main

# 4. Resolve conflicts (if any)
# ... resolve conflicts ...
git add .
git commit

# 5. Push and create PR
git push -u origin sync-upstream-$(date +%Y%m%d)
gh pr create --title "Sync from BlackRoad-Private upstream"
```

## 🔧 Configuration

### Git Remote Setup

```bash
# Standard configuration
[remote "origin"]
    url = https://github.com/BlackRoad-OS/blackroad-os-web.git
    fetch = +refs/heads/*:refs/remotes/origin/*

[remote "upstream"]
    url = https://github.com/BlackRoad-OS/BlackRoad-Private.git
    fetch = +refs/heads/*:refs/remotes/upstream/*
```

### GitHub Actions Secrets

Required secrets for automated sync:
- `UPSTREAM_TOKEN`: GitHub token with access to BlackRoad-Private (optional, falls back to GITHUB_TOKEN)

## 📊 Sync Strategy

### What Gets Synced

- ✅ Bug fixes from upstream
- ✅ New features (after review)
- ✅ Security updates
- ✅ Documentation improvements
- ✅ Configuration updates

### What Doesn't Get Synced

- ❌ Private API keys
- ❌ Internal infrastructure configs
- ❌ Experimental/unstable features
- ❌ Private dependencies

## 🔍 Checking Sync Status

### Via GitHub Actions

1. Go to Actions tab
2. Select "Sync BlackRoad-Private Upstream"
3. Click "Run workflow"
4. Choose "check-only" mode

### Via Command Line

```bash
# Add upstream if not already added
git remote add upstream https://github.com/BlackRoad-OS/BlackRoad-Private.git 2>/dev/null || true

# Fetch from upstream
git fetch upstream

# Check how many commits behind
git rev-list --count HEAD..upstream/main

# View commit differences
git log HEAD..upstream/main --oneline

# View detailed changes
git log -p HEAD..upstream/main
```

## 🎯 Workflow Triggers

### Scheduled

- **Frequency:** Daily at 2 AM UTC
- **Action:** Check for changes and create PR if needed
- **Mode:** `check-only` (manual review required)

### Manual Dispatch

1. Go to Actions → "Sync BlackRoad-Private Upstream"
2. Click "Run workflow"
3. Select mode:
   - `check-only`: Just check for changes
   - `create-pr`: Create PR with changes
   - `auto-merge`: Create PR and enable auto-merge

### On Demand

```bash
# Trigger via GitHub CLI
gh workflow run sync-upstream.yml \
  -f sync_mode=check-only \
  -f branch=main
```

## ⚠️ Handling Conflicts

When merge conflicts occur:

1. **Automated Notification:** Issue created automatically
2. **Manual Resolution:** Follow instructions in the issue
3. **Review Changes:** Carefully review all conflicting files
4. **Test Thoroughly:** Run tests after resolving conflicts
5. **Create PR:** Submit changes for review

### Conflict Resolution Steps

```bash
# 1. Prepare for merge
git fetch upstream
git checkout -b resolve-upstream-conflicts

# 2. Attempt merge
git merge upstream/main

# 3. Review conflicts
git status
git diff

# 4. Resolve each conflict
# Edit files to resolve conflicts
git add <resolved-files>

# 5. Complete merge
git commit

# 6. Verify
npm run build
npm run lint
npm test

# 7. Push
git push -u origin resolve-upstream-conflicts
```

## 📚 Related Documentation

- [Contributing Guide](../CONTRIBUTING.md) - Development process
- [README](../README.md) - Main documentation
- [Security Policy](../SECURITY.md) - Security guidelines

## 🤝 Support

### For Upstream Access

- **Email:** blackroad.systems@gmail.com
- **Subject:** "BlackRoad-Private Access Request"
- **Include:** GitHub username and team/role

### For Sync Issues

- **Create Issue:** Use "upstream" label
- **GitHub Actions:** Check workflow logs
- **Email:** For urgent matters

## 📝 Best Practices

### For Team Members

1. **Regular Syncs:** Fetch upstream regularly to stay updated
2. **Branch Strategy:** Create feature branches from upstream when possible
3. **Review Changes:** Always review upstream changes before merging
4. **Test First:** Run tests after syncing to catch issues early
5. **Document:** Update docs if upstream brings breaking changes

### For Maintainers

1. **Review PRs:** Carefully review all upstream sync PRs
2. **Security Check:** Verify no sensitive data is included
3. **Breaking Changes:** Communicate breaking changes to the team
4. **Release Notes:** Document upstream changes in releases
5. **Conflict Prevention:** Coordinate with upstream maintainers

## 🔒 Security Considerations

- **Token Management:** Keep upstream tokens secure
- **Access Control:** Limit upstream access to core team
- **Review Process:** All upstream changes must be reviewed
- **Secrets:** Never sync private secrets or keys
- **Dependencies:** Verify upstream dependencies for vulnerabilities

## 📊 Sync Metrics

Track sync health:
- Last sync date
- Commits behind upstream
- Conflict frequency
- PR merge time
- Failed sync attempts

These metrics are available in GitHub Actions logs and can be monitored via the Actions tab.

---

**Last Updated:** 2026-02-15
**Maintained By:** BlackRoad OS Core Team
**Questions?** blackroad.systems@gmail.com
