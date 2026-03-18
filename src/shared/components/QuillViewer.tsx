import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { Document } from '@tiptap/extension-document';
import { Text } from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import { HardBreak } from '@tiptap/extension-hard-break';
import { TextStyle } from '@tiptap/extension-text-style';
import { ListItem } from '@tiptap/extension-list-item';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { Bold } from "reactjs-tiptap-editor/bold";
import { Italic } from "reactjs-tiptap-editor/italic";
import { Heading } from "reactjs-tiptap-editor/heading";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { Image } from "reactjs-tiptap-editor/image";
import { Color } from 'reactjs-tiptap-editor/color';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { Table } from 'reactjs-tiptap-editor/table';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";
import { Strike } from "reactjs-tiptap-editor/strike";
import { Link } from "reactjs-tiptap-editor/link";
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { FontWeight } from "./Extensions/FontWeight";
import { NoTrailingParagraph } from "./Extensions/NoTrailingP";

const viewerExtensions = [
  Document,
  Text,
  HardBreak,
  Paragraph.configure({ HTMLAttributes: { dir: 'auto' } }),
  ListItem,
  TextStyle,
  Bold,
  Italic,
  TextUnderline,
  NoTrailingParagraph,
  Strike,
  Heading,
  Image.configure({ resourceImage: "link" }),
  TextAlign.configure({ types: ['heading', 'paragraph', 'listItem', 'image'] }),
  Color,
  FontSize,
  Table,
  TextDirection.configure({ types: ['heading', 'paragraph', 'listItem'], defaultDirection: 'auto' }),
  Indent.configure({ types: ['heading', 'paragraph', 'listItem', 'blockquote'] }),
  LineHeight,
  Link,
  FontWeight,
  BulletList.configure({ keepMarks: true, keepAttributes: true }),
  OrderedList.configure({ keepMarks: true, keepAttributes: true }),
];

export function QuillViewer({ html, isLineClamp = true }: { html: string; isLineClamp?: boolean }) {
  const editor = useEditor({
    extensions: viewerExtensions,
    content: html,
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && typeof html === 'string' && html !== editor.getHTML()) {
      const editorHTML = html.replace(/(<p[^>]*>\s*(<br[^>]*>)?\s*<\/p>\s*)+$/, '');

      editor.commands.setContent(editorHTML);
    }
  }, [editor, html]);

  return (
    <EditorContent
      editor={editor}
      className={`quill-viewer wrap-break-word w-full ${isLineClamp ? 'line-clamp-4! overflow-hidden' : 'overflow-visible'}`}
    />
  );
}

