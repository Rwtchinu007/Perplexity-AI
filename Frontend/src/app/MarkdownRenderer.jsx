import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // --------------------------------
        // Paragraph
        // --------------------------------
        p: ({ children }) => (
          <p className="mb-4 leading-7 last:mb-0">{children}</p>
        ),

        // --------------------------------
        // Headings
        // --------------------------------
        h1: ({ children }) => (
          <h1 className="mt-6 mb-4 text-2xl font-bold first:mt-0">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mt-6 mb-3 text-xl font-semibold first:mt-0">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mt-5 mb-2 text-lg font-semibold first:mt-0">
            {children}
          </h3>
        ),

        // --------------------------------
        // Bold
        // --------------------------------
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),

        // --------------------------------
        // Italic
        // --------------------------------
        em: ({ children }) => <em className="italic">{children}</em>,

        // --------------------------------
        // Unordered List
        // --------------------------------
        ul: ({ children }) => (
          <ul className="mb-4 ml-5 list-disc space-y-1 pl-2">{children}</ul>
        ),

        // --------------------------------
        // Ordered List
        // --------------------------------
        ol: ({ children }) => (
          <ol className="mb-4 ml-5 list-decimal space-y-1 pl-2">{children}</ol>
        ),

        // --------------------------------
        // List Item
        // --------------------------------
        li: ({ children }) => <li className="leading-7 pl-1">{children}</li>,

        // --------------------------------
        // Inline Code + Code Blocks
        // --------------------------------
        code: ({ children, className }) => {
          const match = /language-(\w+)/.exec(className || "");

          const code = String(children).replace(/\n$/, "");

          // Normal inline code
          if (!match) {
            return (
              <code className="rounded-md bg-black/10 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/10">
                {children}
              </code>
            );
          }

          // Code block
          return <CodeBlock language={match[1]} code={code} />;
        },

        // --------------------------------
        // Pre
        // --------------------------------
        pre: ({ children }) => <div className="my-4">{children}</div>,

        // --------------------------------
        // Blockquote
        // --------------------------------
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-gray-400 pl-4 italic opacity-80">
            {children}
          </blockquote>
        ),

        // --------------------------------
        // Links
        // --------------------------------
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-2 hover:opacity-70"
          >
            {children}
          </a>
        ),

        // --------------------------------
        // Horizontal Rule
        // --------------------------------
        hr: () => <hr className="my-6 border-gray-300 dark:border-gray-700" />,

        // --------------------------------
        // Tables
        // --------------------------------
        table: ({ children }) => (
          <div className="my-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),

        thead: ({ children }) => (
          <thead className="bg-black/5 dark:bg-white/5">{children}</thead>
        ),

        th: ({ children }) => (
          <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold dark:border-gray-700">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            {children}
          </td>
        ),

        tr: ({ children }) => <tr>{children}</tr>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

// ========================================
// Code Block Component
// ========================================

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

          <span className="ml-2 text-xs text-gray-400">
            {language || "code"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="rounded-md px-2.5 py-1.5 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <div className="code-scrollbar overflow-x-auto">
        <SyntaxHighlighter
          language={language || "text"}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "18px",
            background: "transparent",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
