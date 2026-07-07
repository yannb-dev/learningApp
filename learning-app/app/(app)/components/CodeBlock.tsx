"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function CodeBlock({ code }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      hljs.highlightElement(ref.current);
    }
  }, []);

  return (
    <pre>
      <code ref={ref} className="language-typescript text-xs p-2 rounded-sm">
        {code}
      </code>
    </pre>
  );
}
