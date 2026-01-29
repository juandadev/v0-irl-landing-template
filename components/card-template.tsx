"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import html2canvas from "html2canvas";

interface CardTemplateProps {
  userName: string;
  onTextureReady: (dataUrl: string) => void;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
}

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, onTextureReady }, ref) => {
    const templateRef = useRef<HTMLDivElement>(null);

    const captureTexture = async () => {
      if (!templateRef.current) return;

      const canvas = await html2canvas(templateRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const dataUrl = canvas.toDataURL("image/png");
      onTextureReady(dataUrl);
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
    }));

    return (
      <div
        ref={templateRef}
        className="absolute -left-[9999px] -top-[9999px] pointer-events-none"
        style={{
          width: "512px",
          height: "512px",
        }}
      >
        {/* Card design - black square with centered icon and name at bottom */}
        <div
          className="w-full h-full flex flex-col items-center justify-between p-8"
          style={{
            backgroundColor: "#000000",
            fontFamily: '"Geist Mono", monospace',
          }}
        >
          {/* Top spacer */}
          <div />

          {/* Center - V0 Icon */}
          <div className="flex-1 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon.svg"
              alt="V0 Icon"
              className="w-32 h-32"
              crossOrigin="anonymous"
            />
          </div>

          {/* Bottom - User Name */}
          <div className="w-full text-center">
            <span
              className="text-white text-2xl font-bold tracking-wider uppercase"
              style={{ fontFamily: '"Geist Mono", monospace' }}
            >
              {userName || "YOUR NAME"}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;
