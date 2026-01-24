'use client';

import { useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Bot, MessageSquare, Keyboard, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useOnboardingStore } from '@/stores/onboarding-store';

const stepIcons = [Sparkles, Bot, MessageSquare, Keyboard];
const stepColors = [
  'from-blue-500 to-purple-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-red-500',
  'from-purple-500 to-pink-600',
];

export default function Onboarding() {
  const {
    hasSeenOnboarding,
    currentStep,
    steps,
    showOnboarding,
    setCurrentStep,
    completeStep,
    closeOnboarding,
    openOnboarding,
  } = useOnboardingStore();

  useEffect(() => {
    if (!hasSeenOnboarding) {
      openOnboarding();
    }
  }, [hasSeenOnboarding, openOnboarding]);

  if (!showOnboarding) return null;

  const step = steps[currentStep];
  const Icon = stepIcons[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    completeStep(step.id);
    if (isLastStep) {
      closeOnboarding();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    closeOnboarding();
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="px-8 pt-12 pb-8">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === currentStep
                      ? 'w-8 bg-blue-600'
                      : index < currentStep
                      ? 'w-2 bg-blue-400'
                      : 'w-2 bg-gray-300 dark:bg-gray-600'
                  )}
                />
              ))}
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div
                className={cn(
                  'h-20 w-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg',
                  stepColors[currentStep]
                )}
              >
                <Icon className="h-10 w-10" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {step.description}
              </p>
            </div>

            {/* Step-specific content */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { name: 'Lucidia', desc: 'General AI', color: 'bg-blue-500' },
                  { name: 'Codex', desc: 'Code Expert', color: 'bg-green-500' },
                  { name: 'Aria', desc: 'Infrastructure', color: 'bg-purple-500' },
                  { name: 'Sentinel', desc: 'Security', color: 'bg-red-500' },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <div className={cn('h-8 w-8 rounded-full', agent.color)} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {agent.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {agent.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-3 mb-8">
                {[
                  { keys: ['Cmd', 'K'], desc: 'Quick navigation' },
                  { keys: ['Cmd', '/'], desc: 'Keyboard shortcuts' },
                  { keys: ['Cmd', 'N'], desc: 'New conversation' },
                ].map((shortcut, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {shortcut.desc}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, ki) => (
                        <kbd
                          key={ki}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono text-gray-700 dark:text-gray-300"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                  currentStep === 0
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Skip tour
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {isLastStep ? (
                  <>
                    Get Started
                    <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
