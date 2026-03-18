/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RichTextProvider } from 'reactjs-tiptap-editor';
import { EditorContent, useEditor } from "@tiptap/react";
import { Document } from '@tiptap/extension-document';
import { Text } from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Dropcursor, Gapcursor, Placeholder } from '@tiptap/extensions';
import { HardBreak } from '@tiptap/extension-hard-break';
import { TextStyle } from '@tiptap/extension-text-style';
import { ListItem } from '@tiptap/extension-list-item';
import { BulletList, RichTextBulletList } from 'reactjs-tiptap-editor/bulletlist';
import { OrderedList, RichTextOrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold";
import { Italic, RichTextItalic } from "reactjs-tiptap-editor/italic";
import { Heading, RichTextHeading } from "reactjs-tiptap-editor/heading";
import { TextAlign, RichTextAlign } from "reactjs-tiptap-editor/textalign";
import { Image, RichTextImage } from "reactjs-tiptap-editor/image";
import { Color, RichTextColor } from 'reactjs-tiptap-editor/color';
import { FontSize, RichTextFontSize } from 'reactjs-tiptap-editor/fontsize';
import { Table, RichTextTable } from 'reactjs-tiptap-editor/table';
import { TextDirection, RichTextTextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Indent, RichTextIndent } from 'reactjs-tiptap-editor/indent';
import { TextUnderline, RichTextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Strike, RichTextStrike } from "reactjs-tiptap-editor/strike";
import { History, RichTextUndo, RichTextRedo } from "reactjs-tiptap-editor/history";
import { Link, RichTextLink } from "reactjs-tiptap-editor/link";
import { LineHeight, RichTextLineHeight } from 'reactjs-tiptap-editor/lineheight';
import { FontWeight } from "../Extensions/FontWeight";
import { NoTrailingParagraph } from "../Extensions/NoTrailingP";
import useDebounce from "@/shared/hooks/useDebouncing";
import Loading from "../Loading";

interface SharedRichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    onTextChange?: (text: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

const RichTextToolbar = ({ editor }: { editor: any }) => (
    <div className="flex items-center p-1 gap-1 flex-wrap border-b border-gray-300">
        <RichTextUndo />
        <RichTextRedo />
        <RichTextHeading />
        <RichTextFontSize />
        <RichTextBold />
        <RichTextItalic />
        <RichTextUnderline />
        <RichTextStrike />
        <RichTextColor />
        <RichTextAlign />
        <RichTextBulletList />
        <RichTextOrderedList />
        <RichTextIndent />
        <RichTextLineHeight />
        <RichTextLink />
        <RichTextImage />
        <RichTextTable />
        <RichTextTextDirection />
        <RichTextFontWeight editor={editor} />
    </div>
);

const fontWeightOptions = [
    { text: '100', value: '100' },
    { text: '200', value: '200' },
    { text: '300', value: '300' },
    { text: '400', value: '400' },
    { text: '500', value: '500' },
    { text: '600', value: '600' },
    { text: '700', value: '700' },
    { text: '800', value: '800' },
    { text: '900', value: '900' },
];

const RichTextFontWeight = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const currentWeight = editor.getAttributes('textStyle').fontWeight || '400';

    return (
        <select
            className="h-7 text-xs border border-gray-300 rounded px-1 focus:outline-none focus:ring-1 focus:ring-cms-primary"
            value={currentWeight}
            onChange={(e) => {
                const weight = e.target.value;
                if (weight === '400') {
                    editor.commands.unsetFontWeight();
                } else {
                    editor.commands.setFontWeight(weight);
                }
            }}
        >
            <option value="" disabled>Weight</option>
            {fontWeightOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.text}</option>
            ))}
        </select>
    );
};

const SharedRichTextEditor = React.memo(function SharedRichTextEditor(props: SharedRichTextEditorProps) {
    const { content, onChange, label, className, onTextChange, placeholder } = props;
    const debounce = useDebounce();

    const editor = useEditor({
        textDirection: 'auto',
        immediatelyRender: false,
        extensions: [
            Document,
            Text,
            Dropcursor,
            Gapcursor,
            Paragraph.configure({
                HTMLAttributes: { dir: 'auto' },
            }),
            ListItem,
            TextStyle,
            Placeholder.configure({
                placeholder: placeholder ?? "Press '/' for commands",
            }),
            History,
            HardBreak.extend({
                renderHTML() {
                    return ['br', { 'data-type': 'hard-break' }];
                },
                addKeyboardShortcuts() {
                    return {
                        'Shift-Enter': () => this.editor.commands.insertContent('\n'),
                    };
                },
            }),
            Heading,
            FontSize,
            Bold,
            Italic,
            TextUnderline,
            Strike,
            Link,
            LineHeight,
            NoTrailingParagraph,
            Image.configure({
                resourceImage: "link",
                HTMLAttributes: { class: 'tiptap-image' },
            }),
            Color,
            TextAlign.configure({ types: ['heading', 'paragraph', 'listItem', 'image'] }),
            Table,
            Indent.configure({
                types: ['heading', 'paragraph', 'listItem', 'blockquote'],
            }),
            TextDirection.configure({
                types: ['heading', 'paragraph', 'listItem'],
                defaultDirection: 'auto',
            }),

            FontWeight,
            BulletList.configure({
                keepMarks: true,
                keepAttributes: true,
            }),
            OrderedList.configure({
                keepMarks: true,
                keepAttributes: true,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            debounce(() => {
                let html = editor.getHTML();
                html = html.replace(
                    /<p[^>]*><br class="ProseMirror-trailingBreak"><\/p>$/,
                    ''
                );
                html = html.replace(
                    /<p dir="auto"><br class="ProseMirror-trailingBreak"><\/p>$/,
                    ''
                )
                html = html.replace(/(<p[^>]*>\s*(<br[^>]*>)?\s*<\/p>\s*)+$/, '');

                onChange(html);

                if (typeof onTextChange === 'function') {
                    onTextChange(editor.getText());
                }
            }, 20);
        }
    });
    React.useEffect(() => {
        if (!editor) return;
        const editorHTML = editor.getHTML().replace(/(<p[^>]*>\s*(<br[^>]*>)?\s*<\/p>\s*)+$/, '');
        if (content === editorHTML) return;
        editor.commands.setContent(content);
    }, [content, editor]);

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="text-xs font-semibold text-gray-700 ms-1">
                    {label}
                </label>
            )}
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-cms-primary/20 focus-within:border-cms-primary transition-all">
                {editor ? (
                    <RichTextProvider editor={editor}>
                        <RichTextToolbar editor={editor} />
                        <EditorContent className="quill-viewer wrap-break-word" editor={editor} />

                    </RichTextProvider>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
});

export default SharedRichTextEditor;