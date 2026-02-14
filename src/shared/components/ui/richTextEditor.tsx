/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import useDebounce from "../../hooks/useDebouncing";

interface SharedRichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    onTextChange?: (text: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

function htmlToText(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText || "";
}

function isValidHex(input: string) {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(input.trim());
}

/** Register sizes + fonts ONCE (avoid HMR duplicates) */
let registryDone = false;
function registerQuillFormatsOnce() {
    if (registryDone) return;
    registryDone = true;

    const Size = Quill.import("formats/size") as any;
    Size.whitelist = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];
    Quill.register(Size, true);

    const Font = Quill.import("formats/font") as any;
    Font.whitelist = ["sans", "serif", "monospace", "dubai"];
    Quill.register(Font, true);
}

/**
 * Remove Quill injected toolbar/container to prevent duplication.
 * IMPORTANT: don't remove your own toolbar (we avoid .ql-toolbar class on it).
 */
function cleanupQuillDom(wrapper: HTMLElement | null) {
    if (!wrapper) return;
    wrapper.querySelectorAll(":scope > .ql-toolbar").forEach((n) => n.remove());
    wrapper.querySelectorAll(":scope > .ql-container").forEach((n) => n.remove());
}

const SharedRichTextEditor = React.memo(function SharedRichTextEditor({
    content,
    onChange,
    onTextChange,
    label,
    placeholder = "Type here...",
    className,
    disabled = false,
}: SharedRichTextEditorProps) {
    const debounce = useDebounce();

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const mountRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    const applyingExternalRef = useRef(false);
    const lastExternalContentRef = useRef<string | null>(null);

    const sizeWhitelist = useMemo(
        () => ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"],
        []
    );

    // ✅ Init Quill ONLY once
    useEffect(() => {
        if (!wrapperRef.current || !toolbarRef.current || !mountRef.current) return;
        if (quillRef.current) return;

        registerQuillFormatsOnce();

        // remove only Quill injected nodes (not your toolbar)
        cleanupQuillDom(wrapperRef.current);
        mountRef.current.innerHTML = "";

        const quill = new Quill(mountRef.current, {
            theme: "snow",
            placeholder,
            readOnly: disabled,
            modules: {
                toolbar: toolbarRef.current, // ✅ use your DOM toolbar
                history: { delay: 800, maxStack: 100, userOnly: true },
                clipboard: { matchVisual: false },
            },
        });

        const toolbarModule = quill.getModule("toolbar") as any;

        toolbarModule?.addHandler("image", () => {
            const url = window.prompt("Paste image URL");
            if (!url) return;
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", url.trim(), "user");
            quill.setSelection(range.index + 1, 0);
        });

        toolbarModule?.addHandler("video", () => {
            const url = window.prompt("Paste embedded video URL (YouTube/Vimeo)");
            if (!url) return;
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "video", url.trim(), "user");
            quill.setSelection(range.index + 1, 0);
        });

        // ✅ custom HEX color button (works because the button exists)
        const customBtn = toolbarRef.current.querySelector(".ql-customColor") as HTMLButtonElement | null;
        const onCustomColor = () => {
            const current = quill.getFormat()?.color;
            const hex = window.prompt(
                "Enter HEX color (example: #8B0000):",
                typeof current === "string" ? current : "#8B0000"
            );
            if (!hex) return;

            const value = hex.trim();
            if (!isValidHex(value)) {
                window.alert("Invalid HEX. Use like: #8B0000 or #F00");
                return;
            }
            quill.format("color", value);
        };
        customBtn?.addEventListener("click", onCustomColor);

        // initial content silently
        applyingExternalRef.current = true;
        quill.clipboard.dangerouslyPasteHTML(content || "", "silent");
        applyingExternalRef.current = false;
        lastExternalContentRef.current = content;

        // editor defaults
        const editorEl = wrapperRef.current.querySelector(".ql-editor") as HTMLElement | null;
        if (editorEl) {
            editorEl.style.direction = "auto";
            editorEl.style.textAlign = "start";
            editorEl.style.minHeight = "30vh";
        }

        // change listener
        const handler = () => {
            if (applyingExternalRef.current) return;

            const html = quill.root.innerHTML;
            debounce(() => onChange(html), 50);

            if (typeof onTextChange === "function") {
                const text = quill.getText().replace(/\n$/, "");
                onTextChange(text);
            }
        };

        quill.on("text-change", handler);
        quillRef.current = quill;

        return () => {
            customBtn?.removeEventListener("click", onCustomColor);
            quill.off("text-change", handler);
            quillRef.current = null;
            cleanupQuillDom(wrapperRef.current);
            if (mountRef.current) mountRef.current.innerHTML = "";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync external content changes
    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        if (content === lastExternalContentRef.current) return;

        const currentHtml = quill.root.innerHTML;
        if ((content || "") === (currentHtml || "")) {
            lastExternalContentRef.current = content;
            return;
        }

        applyingExternalRef.current = true;
        quill.clipboard.dangerouslyPasteHTML(content || "", "silent");
        applyingExternalRef.current = false;
        lastExternalContentRef.current = content;

        if (typeof onTextChange === "function") {
            onTextChange(htmlToText(content || ""));
        }
    }, [content, onTextChange]);

    // Update readOnly
    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;
        quill.enable(!disabled);
    }, [disabled]);

    return (
        <div className={`space-y-1.5 min-h-[30vh] ${className ?? ""}`}>
            {label && <label className="text-xs font-semibold text-gray-700 ms-1">{label}</label>}

            <div
                ref={wrapperRef}
                className="border min-h-[30vh] border-gray-300 rounded-lg overflow-visible transition-all hover:border-[var(--color-faa-primary)] focus-within:ring-1 focus-within:ring-[var(--color-faa-primary)] focus-within:border-[var(--color-faa-primary)]"
            >
                {/* ✅ Custom toolbar DOM (NOT .ql-toolbar) */}
                <div ref={toolbarRef} className="my-quill-toolbar ql-snow">
                    <span className="ql-formats">
                        <select className="ql-font" defaultValue="sans">
                            <option value="sans">Sans</option>
                            <option value="serif">Serif</option>
                            <option value="monospace">Mono</option>
                            <option value="dubai">Dubai</option>
                        </select>

                        <select className="ql-size" defaultValue="16px">
                            {sizeWhitelist.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </span>

                    <span className="ql-formats">
                        <button className="ql-bold" />
                        <button className="ql-italic" />
                        <button className="ql-underline" />
                        <button className="ql-strike" />
                    </span>

                    <span className="ql-formats">
                        <select className="ql-color" />
                        <select className="ql-background" />
                        <button type="button" className="ql-customColor" title="HEX color" />
                    </span>

                    <span className="ql-formats">
                        <button className="ql-list" value="ordered" />
                        <button className="ql-list" value="bullet" />
                        <button className="ql-indent" value="-1" />
                        <button className="ql-indent" value="+1" />
                    </span>

                    <span className="ql-formats">
                        <select className="ql-align" />
                        <button className="ql-direction" value="rtl" />
                    </span>

                    <span className="ql-formats">
                        <button className="ql-link" />
                        <button className="ql-image" />
                        <button className="ql-video" />
                        <button className="ql-clean" />
                    </span>
                </div>

                {/* editor */}
                <div className="overflow-hidden rounded-b-lg">
                    <div ref={mountRef} />
                </div>
            </div>

            <style>{`
        /* Make toolbar look like Snow toolbar */
        .my-quill-toolbar {
          border-bottom: 1px solid #ccc;
          padding: 8px;
        }

        .ql-font-sans { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
        .ql-font-serif { font-family: Georgia, "Times New Roman", serif; }
        .ql-font-monospace { font-family: Menlo, Monaco, Consolas, "Courier New", monospace; }
        .ql-font-dubai { font-family: "Dubai", sans-serif; }

        .ql-size-12px { font-size: 12px; }
        .ql-size-14px { font-size: 14px; }
        .ql-size-16px { font-size: 16px; }
        .ql-size-18px { font-size: 18px; }
        .ql-size-20px { font-size: 20px; }
        .ql-size-24px { font-size: 24px; }
        .ql-size-28px { font-size: 28px; }
        .ql-size-32px { font-size: 32px; }

        .ql-customColor::before {
          content: "#";
          font-weight: 900;
        }

        .ql-editor { direction: auto; text-align: start; min-height: 30vh !important; }
      `}</style>
        </div>
    );
});

export default SharedRichTextEditor;
