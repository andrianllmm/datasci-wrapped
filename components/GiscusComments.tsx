"use client";

import Giscus from "@giscus/react";

interface GiscusCommentsProps {
  term: string;
  title?: string;
}

/**
 * Displays GitHub Discussions comments using Giscus
 */
export default function GiscusComments({ term, title }: GiscusCommentsProps) {
  return (
    <div className="my-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <Giscus
        id="comments"
        repo="andrianllmm/datasci-wrapped"
        repoId="R_kgDOQtciHg"
        category="General"
        categoryId="DIC_kwDOQtciHs4C2DH_"
        mapping="specific"
        strict="0"
        reactionsEnabled="1"
        term={term}
        emitMetadata="0"
        inputPosition="top"
        theme={process.env.NEXT_PUBLIC_GISCUS_THEME || "purple_dark"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
