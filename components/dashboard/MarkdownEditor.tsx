import React, { useState } from 'react';
import { MdFormatBold, MdFormatItalic, MdInsertLink, MdCode, MdTitle, MdPreview, MdEdit } from 'react-icons/md';

// Simple custom Markdown to HTML preview helper
export const parseMarkdown = (markdown: string) => {
  if (!markdown) return "<p class='text-outline italic'>// No content provided. Start typing below...</p>";
  
  let html = markdown
    // Escape HTML tags to prevent basic XSS
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-surface-container-lowest border border-white/10 p-4 rounded font-label-mono text-primary-container overflow-x-auto my-4 whitespace-pre-wrap">$1</pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded font-label-mono text-secondary-container">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-on-surface">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em class="italic text-on-surface-variant">$1</em>')
    // Headings (H3, H2, H1)
    .replace(/^### (.*$)/gim, '<h3 class="text-headline-md font-bold text-primary-container mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-headline-lg font-bold text-primary-container mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-headline-xl font-bold text-primary-container mt-10 mb-6">$1</h1>')
    // Unordered lists
    .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-6 list-disc text-on-surface-variant my-1">$1</li>')
    // Paragraphs (we split by double newlines)
    .split('\n\n')
    .map(para => {
      // Check if it's already an HTML block element we parsed
      if (para.startsWith('<h') || para.startsWith('<pre') || para.startsWith('<li')) {
        return para;
      }
      return `<p class="my-3 text-on-surface-variant leading-relaxed">${para.replace(/\n/g, '<br />')}</p>`;
    })
    .join('');

  return html;
};

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  placeholder?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, label, placeholder }) => {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  
  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    
    const replacement = before + selected + after;
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    
    onChange(newValue);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-2 w-full font-label-mono">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <label className="text-[12px] font-bold text-primary-container uppercase tracking-wider">{label}</label>
        <div className="flex gap-2 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 flex items-center gap-1 border transition-all ${
              activeTab === 'write'
                ? 'bg-primary-container/10 border-primary-container text-primary-container'
                : 'border-white/10 text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <MdEdit className="text-[14px]" /> WRITE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 flex items-center gap-1 border transition-all ${
              activeTab === 'preview'
                ? 'bg-primary-container/10 border-primary-container text-primary-container'
                : 'border-white/10 text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <MdPreview className="text-[14px]" /> PREVIEW
          </button>
        </div>
      </div>

      {activeTab === 'write' ? (
        <div className="border border-white/10 bg-surface-container-lowest/80 flex flex-col rounded-sm">
          {/* Format Tools */}
          <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-surface-container-low/50">
            <button
              type="button"
              onClick={() => insertText('**', '**')}
              className="p-1.5 hover:bg-white/10 text-on-surface-variant hover:text-primary-container rounded transition-colors"
              title="Bold"
            >
              <MdFormatBold className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => insertText('*', '*')}
              className="p-1.5 hover:bg-white/10 text-on-surface-variant hover:text-primary-container rounded transition-colors"
              title="Italic"
            >
              <MdFormatItalic className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => insertText('### ')}
              className="p-1.5 hover:bg-white/10 text-on-surface-variant hover:text-primary-container rounded transition-colors"
              title="Heading"
            >
              <MdTitle className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => insertText('[', '](url)')}
              className="p-1.5 hover:bg-white/10 text-on-surface-variant hover:text-primary-container rounded transition-colors"
              title="Link"
            >
              <MdInsertLink className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => insertText('```\n', '\n```')}
              className="p-1.5 hover:bg-white/10 text-on-surface-variant hover:text-primary-container rounded transition-colors"
              title="Code Block"
            >
              <MdCode className="text-lg" />
            </button>
          </div>
          <textarea
            id="markdown-textarea"
            className="w-full bg-transparent p-4 min-h-[250px] font-label-mono text-label-mono text-primary-container focus:outline-none resize-y"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Start writing in markdown..."}
          />
        </div>
      ) : (
        <div 
          className="border border-white/10 bg-surface-container-lowest/80 p-4 min-h-[300px] overflow-y-auto font-body-md rounded-sm"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
        />
      )}
    </div>
  );
};
