"use client";

import { forwardRef, useImperativeHandle, useEffect, useState } from "react";

interface CardTemplateProps {
  userName: string;
  onTextureReady: (dataUrl: string) => void;
}

export interface CardTemplateRef {
  captureTexture: () => Promise<void>;
}

const CANVAS_SIZE = 1376;

const CardTemplate = forwardRef<CardTemplateRef, CardTemplateProps>(
  ({ userName, onTextureReady }, ref) => {
    const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);

    // Preload the base card image
    useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => setBaseImage(img);
      img.src = "/card-base-dark.png";
    }, []);

    const captureTexture = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_SIZE;
      canvas.height = CANVAS_SIZE;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      // Draw base card image (fills entire canvas)
      if (baseImage) {
        ctx.drawImage(baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      } else {
        // Fallback black background if image not loaded
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }

      // Draw user name at the bottom left area (below the geometric pattern)
      const displayName = userName || "YOUR NAME";
      ctx.fillStyle = "#ffffff";
      ctx.font = 'normal 48px "Geist Mono", monospace';
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      
      const textX = (CANVAS_SIZE / 2) - 55;
      const textY = CANVAS_SIZE - 400;
      ctx.fillText(displayName.toUpperCase(), textX, textY);

      const dataUrl = canvas.toDataURL("image/png");
      onTextureReady(dataUrl);
    };

    useImperativeHandle(ref, () => ({
      captureTexture,
    }));

    // This component doesn't render anything visible
    return null;
  }
);

CardTemplate.displayName = "CardTemplate";

export default CardTemplate;
