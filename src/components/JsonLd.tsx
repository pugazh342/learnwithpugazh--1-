import {  useEffect  } from 'react';

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}

/**
 * JsonLd component that dynamically injects JSON-LD script tags
 * into the document head and cleans them up on unmount or re-render.
 */
export function JsonLd({ data, id = 'structured-data-jsonld' }: JsonLdProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let scriptTag = document.getElementById(id) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    try {
      scriptTag.text = JSON.stringify(data);
    } catch (err) {
      console.warn('Failed to serialize JSON-LD:', err);
    }

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [data, id]);

  return null;
}

export default JsonLd;
