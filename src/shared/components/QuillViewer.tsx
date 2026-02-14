import DOMPurify from "dompurify";

export function QuillViewer({ html, isLineClamp = true }: { html: string, isLineClamp?: boolean }) {
  const clean = DOMPurify.sanitize(html, {
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <div
      className={`quill-viewer ${isLineClamp ? 'line-clamp-4!' : ''} break-words w-full overflow-hidden`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
