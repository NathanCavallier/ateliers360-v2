"use client";

import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const markdownComponents: Components = {
  // Headings
  h1: ({ node, ...props }) => (
    <h1 className="text-3xl font-bold mb-4 mt-6 first:mt-0" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-2xl font-bold mb-3 mt-5 first:mt-0" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-xl font-bold mb-3 mt-4 first:mt-0" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="text-lg font-bold mb-2 mt-3 first:mt-0" {...props} />
  ),
  h5: ({ node, ...props }) => (
    <h5 className="font-bold mb-2 mt-3 first:mt-0" {...props} />
  ),
  h6: ({ node, ...props }) => (
    <h6 className="font-bold mb-2 mt-2 first:mt-0" {...props} />
  ),

  // Paragraphs and text
  p: ({ node, ...props }) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),

  // Lists
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 ml-4" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4" {...props} />
  ),
  li: ({ node, ...props }) => (
    <li className="text-base" {...props} />
  ),

  // Code blocks
  code: (props: any) => {
    const { node, inline, ...rest } = props;
    if (inline) {
      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary"
          {...rest}
        />
      );
    }
    return (
      <code
        className="bg-muted p-4 rounded-lg block overflow-x-auto font-mono text-sm mb-4"
        {...rest}
      />
    );
  },
  pre: ({ node, ...props }) => (
    <pre
      className="bg-muted p-4 rounded-lg overflow-x-auto mb-4"
      {...props}
    />
  ),

  // Links
  a: ({ node, ...props }) => (
    <a
      className="text-primary hover:underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  // Blockquotes
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4"
      {...props}
    />
  ),

  // Horizontal rule
  hr: ({ node, ...props }) => (
    <hr className="my-6 border-muted" {...props} />
  ),

  // Tables
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="w-full border-collapse border border-muted"
        {...props}
      />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: ({ node, ...props }) => (
    <tbody {...props} />
  ),
  tr: ({ node, ...props }) => (
    <tr className="border border-muted" {...props} />
  ),
  th: ({ node, ...props }) => (
    <th className="px-4 py-2 text-left font-semibold border border-muted" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="px-4 py-2 border border-muted" {...props} />
  ),

  // Strong and emphasis
  strong: ({ node, ...props }) => (
    <strong className="font-bold" {...props} />
  ),
  em: ({ node, ...props }) => (
    <em className="italic" {...props} />
  ),
};

export function MarkdownContent({
  content,
  className = "text-muted-foreground",
}: MarkdownContentProps) {
  if (!content || !content.trim()) {
    return null;
  }

  return (
    <div className={className}>
      <ReactMarkdown components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
