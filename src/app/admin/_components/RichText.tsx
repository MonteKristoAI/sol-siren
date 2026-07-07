"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List } from "lucide-react";

// Minimal rich-text editor: bold, italic, bullet list. Outputs HTML so it
// renders on the product page, but the person never sees or types HTML.
export default function RichText({
  value,
  onChange,
  minHeight = 140,
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Load the incoming value when it changes, but never while the person is
  // typing (that would jump the cursor).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement === el) return;
    if (el.innerHTML !== (value || "")) el.innerHTML = value || "";
  }, [value]);

  function emit() {
    onChange(ref.current?.innerHTML || "");
  }
  function cmd(command: string) {
    ref.current?.focus();
    document.execCommand(command, false);
    emit();
  }

  return (
    <div className="rounded border border-[#E4DAC9] focus-within:border-[#B8A48A]">
      <div className="flex items-center gap-1 border-b border-[#E4DAC9] bg-[#FAF7F1] px-2 py-1.5">
        <Btn onClick={() => cmd("bold")} label="Bold"><Bold size={14} /></Btn>
        <Btn onClick={() => cmd("italic")} label="Italic"><Italic size={14} /></Btn>
        <Btn onClick={() => cmd("insertUnorderedList")} label="Bullet list"><List size={14} /></Btn>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        className="prose-sm max-w-none px-3 py-2 text-sm leading-relaxed outline-none [&_ul]:list-disc [&_ul]:pl-5"
        style={{ minHeight }}
      />
    </div>
  );
}

function Btn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded text-[#5a5246] hover:bg-[#E4DAC9]"
    >
      {children}
    </button>
  );
}
