'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/cn';

interface MarkdownProps {
  content: string;
  className?: string;
}

export default function Markdown({ content, className }: MarkdownProps) {
  const rendered = useMemo(() => {
    let html = content;

    // Code blocks (```code```)
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 my-3 overflow-x-auto"><code class="text-sm text-gray-100 font-mono">$2</code></pre>'
    );

    // Inline code (`code`)
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400">$1</code>'
    );

    // Bold (**text** or __text__)
    html = html.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
    html = html.replace(
      /__([^_]+)__/g,
      '<strong class="font-semibold">$1</strong>'
    );

    // Italic (*text* or _text_)
    html = html.replace(
      /(?<!\*)\*([^*]+)\*(?!\*)/g,
      '<em class="italic">$1</em>'
    );
    html = html.replace(
      /(?<!_)_([^_]+)_(?!_)/g,
      '<em class="italic">$1</em>'
    );

    // Strikethrough (~~text~~)
    html = html.replace(
      /~~([^~]+)~~/g,
      '<del class="line-through opacity-70">$1</del>'
    );

    // Headers
    html = html.replace(
      /^### (.+)$/gm,
      '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
    );
    html = html.replace(
      /^## (.+)$/gm,
      '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>'
    );
    html = html.replace(
      /^# (.+)$/gm,
      '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>'
    );

    // Links [text](url)
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-500 hover:text-blue-400 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Unordered lists
    html = html.replace(
      /^[*-] (.+)$/gm,
      '<li class="ml-4 list-disc">$1</li>'
    );

    // Ordered lists
    html = html.replace(
      /^\d+\. (.+)$/gm,
      '<li class="ml-4 list-decimal">$1</li>'
    );

    // Wrap consecutive list items
    html = html.replace(
      /(<li class="ml-4 list-disc">[\s\S]*?<\/li>)(?:\n?(<li class="ml-4 list-disc">[\s\S]*?<\/li>))*/g,
      '<ul class="my-2 space-y-1">$&</ul>'
    );
    html = html.replace(
      /(<li class="ml-4 list-decimal">[\s\S]*?<\/li>)(?:\n?(<li class="ml-4 list-decimal">[\s\S]*?<\/li>))*/g,
      '<ol class="my-2 space-y-1">$&</ol>'
    );

    // Blockquotes
    html = html.replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-blue-500 pl-4 my-2 italic text-gray-600 dark:text-gray-400">$1</blockquote>'
    );

    // Horizontal rules
    html = html.replace(
      /^---$/gm,
      '<hr class="my-4 border-gray-300 dark:border-gray-600" />'
    );

    // Line breaks (double newline = paragraph)
    html = html.replace(/\n\n/g, '</p><p class="my-2">');

    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<')) {
      html = `<p class="my-2">${html}</p>`;
    }

    return html;
  }, [content]);

  return (
    <div
      className={cn('prose prose-sm dark:prose-invert max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
}
