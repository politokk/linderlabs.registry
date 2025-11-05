"use client";

import React from "react";

interface MiniBlockPreviewProps {
  componentName: string;
  className?: string;
}

export function MiniBlockPreview({ componentName, className = "" }: MiniBlockPreviewProps) {
  return (
    <div className={`overflow-hidden rounded-lg border bg-background ${className}`}>
      <iframe
        src={`/demo/${componentName}`}
        className="w-full h-[200px] border-0"
        title={`${componentName} preview`}
        loading="lazy"
      />
    </div>
  );
}