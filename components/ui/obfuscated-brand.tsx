"use client";

import React, { useState, useEffect } from "react";

export default function ObfuscatedBrand() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // What the server renders and what bots see in the raw HTML payload
    return <span>Sales</span>;
  }

  // We use CSS hex escapes so the literal string is NEVER evaluated in the JS or DOM.
  // \0057=W, \0068=h, \0061=a, \0074=t, \0073=s, \0041=A, \0070=p
  const hexContent = "\\0057\\0068\\0061\\0074\\0073\\0041\\0070\\0070";

  return (
    <span className="inline-flex items-baseline">
      {/* Screen readers and bots that execute JS will still read "Sales" */}
      <span className="sr-only">Sales</span>
      
      {/* Visual text for humans via CSS pseudo-element. Bots don't index CSS content */}
      <span aria-hidden="true" className="brand-text"></span>
      
      <style>{`
        .brand-text::before {
          content: "${hexContent}";
        }
      `}</style>
    </span>
  );
}
