import { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isArabic?: boolean;
  themeColor?: string;
  minHeight?: string;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = '',
  isArabic = false,
  themeColor = '#A94442',
  minHeight = '200px'
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Update active formats based on cursor position
  const updateActiveFormats = () => {
    const formats = new Set<string>();
    
    if (document.queryCommandState('bold')) formats.add('bold');
    if (document.queryCommandState('italic')) formats.add('italic');
    if (document.queryCommandState('underline')) formats.add('underline');
    if (document.queryCommandState('insertUnorderedList')) formats.add('ul');
    if (document.queryCommandState('insertOrderedList')) formats.add('ol');
    if (document.queryCommandState('justifyLeft')) formats.add('left');
    if (document.queryCommandState('justifyCenter')) formats.add('center');
    if (document.queryCommandState('justifyRight')) formats.add('right');
    
    setActiveFormats(formats);
  };

  // Handle toolbar button clicks
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateActiveFormats();
  };

  // Handle link insertion
  const insertLink = () => {
    const url = prompt(isArabic ? 'أدخل الرابط:' : 'Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Handle content change
  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      updateActiveFormats();
    }
  };

  // Handle paste - strip formatting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Toolbar button component
  const ToolbarButton = ({ 
    icon: Icon, 
    command, 
    value, 
    isActive = false,
    title
  }: { 
    icon: any; 
    command?: string; 
    value?: string; 
    isActive?: boolean;
    title: string;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        if (command === 'insertLink') {
          insertLink();
        } else if (command) {
          execCommand(command, value);
        }
      }}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-200' : ''
      }`}
      title={title}
      style={{
        color: isActive ? themeColor : '#64748b'
      }}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="border-2 rounded-lg overflow-hidden bg-white" style={{ borderColor: isFocused && value ? themeColor : '#d1d5db' }}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex flex-wrap gap-1 items-center">
        {/* Text formatting */}
        <ToolbarButton 
          icon={Bold} 
          command="bold" 
          isActive={activeFormats.has('bold')}
          title={isArabic ? 'غامق' : 'Bold'}
        />
        <ToolbarButton 
          icon={Italic} 
          command="italic" 
          isActive={activeFormats.has('italic')}
          title={isArabic ? 'مائل' : 'Italic'}
        />
        <ToolbarButton 
          icon={Underline} 
          command="underline" 
          isActive={activeFormats.has('underline')}
          title={isArabic ? 'تحته خط' : 'Underline'}
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Lists */}
        <ToolbarButton 
          icon={List} 
          command="insertUnorderedList" 
          isActive={activeFormats.has('ul')}
          title={isArabic ? 'قائمة نقطية' : 'Bulleted List'}
        />
        <ToolbarButton 
          icon={ListOrdered} 
          command="insertOrderedList" 
          isActive={activeFormats.has('ol')}
          title={isArabic ? 'قائمة مرقمة' : 'Numbered List'}
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Alignment */}
        <ToolbarButton 
          icon={AlignLeft} 
          command="justifyLeft" 
          isActive={activeFormats.has('left')}
          title={isArabic ? 'محاذاة لليسار' : 'Align Left'}
        />
        <ToolbarButton 
          icon={AlignCenter} 
          command="justifyCenter" 
          isActive={activeFormats.has('center')}
          title={isArabic ? 'توسيط' : 'Center'}
        />
        <ToolbarButton 
          icon={AlignRight} 
          command="justifyRight" 
          isActive={activeFormats.has('right')}
          title={isArabic ? 'محاذاة لليمين' : 'Align Right'}
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Link */}
        <ToolbarButton 
          icon={LinkIcon} 
          command="insertLink" 
          title={isArabic ? 'إدراج رابط' : 'Insert Link'}
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Clear formatting */}
        <ToolbarButton 
          icon={RotateCcw} 
          command="removeFormat" 
          title={isArabic ? 'مسح التنسيق' : 'Clear Formatting'}
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => {
          setIsFocused(true);
          updateActiveFormats();
        }}
        onBlur={() => setIsFocused(false)}
        onMouseUp={updateActiveFormats}
        onKeyUp={updateActiveFormats}
        onPaste={handlePaste}
        className="p-4 focus:outline-none overflow-y-auto"
        style={{
          minHeight,
          fontFamily: isArabic ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif',
          direction: isArabic ? 'rtl' : 'ltr',
          textAlign: isArabic ? 'right' : 'left',
          color: '#334155',
          lineHeight: '1.6'
        }}
        data-placeholder={placeholder}
      />
      
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] a {
          color: ${themeColor};
          text-decoration: underline;
        }
        
        [contenteditable] ul,
        [contenteditable] ol {
          margin: 0.5rem 0;
          padding-${isArabic ? 'right' : 'left'}: 1.5rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
