/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { BaseKit } from 'reactjs-tiptap-editor/base-kit';
import { Bold } from "reactjs-tiptap-editor/bold";
import { Italic } from "reactjs-tiptap-editor/italic";
import { Heading } from "reactjs-tiptap-editor/heading";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { Image } from "reactjs-tiptap-editor/image";
import { Color } from 'reactjs-tiptap-editor/color';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Indent } from 'reactjs-tiptap-editor/indent';
import RichTextEditor from "reactjs-tiptap-editor";
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Strike } from "reactjs-tiptap-editor/strike";
import { History } from "reactjs-tiptap-editor/history";
import { Link } from "reactjs-tiptap-editor/link";
import useDebounce from "../../hooks/useDebouncing";
import 'reactjs-tiptap-editor/style.css';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';


interface SharedRichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    onTextChange?: (text: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

const editorExtensions = [
    BaseKit.configure({
        hardBreak: {
            keepMarks: true,
        },
        paragraph: {
            HTMLAttributes: {
                dir: 'auto', // Automatically detect text direction
            },

        },
        trailingNode: {
            node: 'paragraph',
            notAfter: ['paragraph'],
        },

    }),
    History,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold,
    Italic,
    Image.configure({
        resourceImage: "link",
    }),
    Color.configure({ spacer: true }),
    TextAlign.configure({ types: ['heading', 'paragraph', 'listItem'], spacer: true }),
    Indent.configure({
        types: ['heading', 'paragraph', 'listItem', 'blockquote'],
    }),
    TextDirection.configure({
        types: ['heading', 'paragraph', 'listItem'],
        defaultDirection: 'auto',
    }),
    TextUnderline,
    Strike,
    Link,
    LineHeight,
];

const SharedRichTextEditor = React.memo(function SharedRichTextEditor(props: SharedRichTextEditorProps) {
    const {
        content,
        onChange,
        label,
        className,
    } = props;
    const debounce = useDebounce();
    const onTextChange = props.onTextChange;
    const [editorKey, setEditorKey] = React.useState(0);
    const lastExternalContentRef = React.useRef<string | null>(null);
    const isInternalChangeRef = React.useRef(false);

    React.useEffect(() => {
        if (typeof onTextChange === 'function') {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = content || "";
            const text = tempDiv.textContent || tempDiv.innerText || "";
            onTextChange(text);
        }
    }, [content, onTextChange]);

    React.useEffect(() => {
        if (isInternalChangeRef.current) {
            isInternalChangeRef.current = false;
            return;
        }
        if (content !== lastExternalContentRef.current) {
            lastExternalContentRef.current = content;
            setEditorKey(prev => prev + 1);
        }
    }, [content]);

    const onValueChange = useCallback(
        (value: any) => {
            isInternalChangeRef.current = true;
            lastExternalContentRef.current = value;
            debounce(() => {
                onChange(value);
            }, 50);
        },
        [debounce, onChange]
    );

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="text-xs font-semibold text-gray-700 ms-1">
                    {label}
                </label>
            )}

            <div
                className="border border-gray-300 rounded-lg overflow-hidden transition-all hover:border-[var(--color-faa-primary)] focus-within:ring-1 focus-within:ring-[var(--color-faa-primary)] focus-within:border-[var(--color-faa-primary)]"
            >
                <RichTextEditor
                    key={editorKey}
                    output="html"
                    contentClass={'border-none'}
                    toolbar={{
                        render: (_props, _toolbarItems, dom, containerDom) => {
                            const sanitizedDom = dom.map((el: any) =>
                                React.isValidElement(el)
                                    ? React.cloneElement(el as any, { tooltipOptions: undefined })
                                    : el
                            );
                            return containerDom(sanitizedDom);
                        }
                    }}
                    content={content}
                    onChangeContent={onValueChange}
                    extensions={editorExtensions}
                    dark={false}
                    disabled={false}
                    hideBubble={false}
                    bubbleMenu={{
                        tableConfig: {
                            hiddenActions: ['setCellBackground'],
                        }
                    }}
                />
            </div>
        </div>
    );
});

export default SharedRichTextEditor;

