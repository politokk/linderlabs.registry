// components/Orb.tsx
"use client";

import * as React from "react";

const isVideoUrl = (url: string) => {
  return /\.(mp4|webm|ogg|mov)$/i.test(url)
}

type OrbProps = {
  src?: string;
  size?: number; // px

  // Mode A: numeric controls (used when raw styles not provided)
  hueDeg?: number;      // e.g. 149
  saturate?: number;    // e.g. 1.2 for 120%
  rotateDeg?: number;   // e.g. 149

  // Mode B: raw CSS strings (take precedence over numeric)
  filter?: string;      // e.g. "hue-rotate(101deg) saturate(120%)"
  transform?: string;   // e.g. "rotate(101deg)"

  // Common image props
  objectFit?: React.CSSProperties["objectFit"];             // default "cover"
  objectPosition?: React.CSSProperties["objectPosition"];   // default "center center"

  // NEW: allow arbitrary style overrides for wrapper and image
  wrapperStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;

  className?: string;
  imgClassName?: string;
};

export function Orb({
  src = "/themes/orb-5.webp",
  size = 128,

  // numeric defaults
  hueDeg = 149,
  saturate = 1.2,
  rotateDeg = 149,

  // raw string overrides
  filter,
  transform,

  objectFit = "cover",
  objectPosition = "center center",

  // NEW style overrides
  wrapperStyle,
  imgStyle,

  className,
  imgClassName,
}: OrbProps) {
  // base wrapper style
  const baseWrapperStyle: React.CSSProperties = { width: size, height: size };

  // base image style (numeric or raw)
  const baseImgStyle: React.CSSProperties = {
    filter: filter ?? `hue-rotate(${hueDeg}deg) saturate(${saturate})`,
    transform: transform ?? `rotate(${rotateDeg}deg)`,
    objectFit,
    objectPosition,
  };

  // Merge order: base → overrides (overrides win)
  const mergedWrapperStyle = { ...baseWrapperStyle, ...(wrapperStyle ?? {}) };
  const mergedImgStyle = { ...baseImgStyle, ...(imgStyle ?? {}) };

  const isVideo = isVideoUrl(src)

  return (
    <div
      className={`relative overflow-hidden rounded-full ${className ?? ""}`}
      style={mergedWrapperStyle}
      aria-hidden
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className={`h-full w-full ${imgClassName ?? ""}`}
          style={mergedImgStyle}
        />
      ) : (
        <img
          src={src}
          alt=""
          draggable={false}
          className={`h-full w-full ${imgClassName ?? ""}`}
          style={mergedImgStyle}
        />
      )}
    </div>
  );
}
