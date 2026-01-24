'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface OnboardingState {
  hasSeenOnboarding: boolean;
  currentStep: number;
  steps: OnboardingStep[];
  showOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  resetOnboarding: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
}

const initialSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to BlackRoad OS',
    description: 'Your AI-powered collaboration platform for building amazing projects',
    completed: false,
  },
  {
    id: 'agents',
    title: 'Meet Your AI Agents',
    description: 'Lucidia, Codex, Aria, and more - each specialized for different tasks',
    completed: false,
  },
  {
    id: 'conversations',
    title: 'Start Conversations',
    description: 'Chat with AI agents to get help with coding, research, and more',
    completed: false,
  },
  {
    id: 'features',
    title: 'Power Features',
    description: 'Use Cmd+K for quick navigation and Cmd+/ for keyboard shortcuts',
    completed: false,
  },
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      currentStep: 0,
      steps: initialSteps,
      showOnboarding: false,

      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),

      setCurrentStep: (step) => set({ currentStep: step }),

      completeStep: (stepId) =>
        set((state) => ({
          steps: state.steps.map((s) =>
            s.id === stepId ? { ...s, completed: true } : s
          ),
        })),

      resetOnboarding: () =>
        set({
          hasSeenOnboarding: false,
          currentStep: 0,
          steps: initialSteps,
          showOnboarding: true,
        }),

      openOnboarding: () => set({ showOnboarding: true }),

      closeOnboarding: () =>
        set({
          showOnboarding: false,
          hasSeenOnboarding: true,
        }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
