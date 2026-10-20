"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the mailto link still works.
    }
  };

  return (
    <button type="button" className="btn btnGhost" onClick={copy} aria-live="polite">
      {copied ? "¡Copiado!" : "Copiar mail"}
    </button>
  );
}
