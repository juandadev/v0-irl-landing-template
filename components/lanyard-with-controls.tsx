"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Lanyard from "@/components/ui/lanyard";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CardTemplate, { type CardTemplateRef, type CardVariant } from "@/components/card-template";
import { Download } from "lucide-react";

const MAX_CHARACTERS = 20;

interface LanyardWithControlsProps {
  position?: [number, number, number];
  containerClassName?: string;
  defaultName?: string;
}

export default function LanyardWithControls({
  position = [0, 0, 20],
  containerClassName,
  defaultName = "",
}: LanyardWithControlsProps) {
  const [inputValue, setInputValue] = useState(defaultName);
  const [appliedName, setAppliedName] = useState(defaultName);
  const [cardVariant, setCardVariant] = useState<CardVariant>("dark");
  const [cardTextureUrl, setCardTextureUrl] = useState<string | undefined>(undefined);
  const [textureKey, setTextureKey] = useState(0);
  const cardTemplateRef = useRef<CardTemplateRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const characterCount = inputValue.length;
  const isAtLimit = characterCount >= MAX_CHARACTERS;
  const isNearLimit = characterCount >= MAX_CHARACTERS - 5;
  const hasChanges = inputValue !== appliedName;

  const handleTextureReady = useCallback((dataUrl: string) => {
    setCardTextureUrl(dataUrl);
    setTextureKey((prev) => prev + 1);
  }, []);

  const handleExport = () => {
    cardTemplateRef.current?.exportCard();
  };

  const handleApplyName = async () => {
    setAppliedName(inputValue);
    // Capture the card template as a texture
    await cardTemplateRef.current?.captureTexture();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hasChanges) {
      handleApplyName();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hidden card template for texture generation */}
      <CardTemplate
        ref={cardTemplateRef}
        userName={inputValue}
        variant={cardVariant}
        onTextureReady={handleTextureReady}
      />
      <Lanyard
        key={textureKey}
        position={position}
        containerClassName={containerClassName}
        cardTextureUrl={cardTextureUrl}
        canvasRef={canvasRef}
      />
      <div className="px-6 pb-8 lg:absolute lg:bottom-8 lg:right-6 lg:w-auto lg:px-0">
        <div className="mx-auto max-w-md lg:mx-0 lg:ml-auto">
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              Personalize your card
            </label>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="cardVariant"
                  value="dark"
                  checked={cardVariant === "dark"}
                  onChange={() => setCardVariant("dark")}
                  className="sr-only"
                />
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-black transition-all ${
                    cardVariant === "dark"
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border"
                  }`}
                >
                  {cardVariant === "dark" && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="cardVariant"
                  value="light"
                  checked={cardVariant === "light"}
                  onChange={() => setCardVariant("light")}
                  className="sr-only"
                />
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white transition-all ${
                    cardVariant === "light"
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border"
                  }`}
                >
                  {cardVariant === "light" && (
                    <span className="h-2 w-2 rounded-full bg-black" />
                  )}
                </span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="userName"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter your name"
                maxLength={MAX_CHARACTERS}
                className="h-10 w-full rounded-md border border-border bg-background px-3 py-2 pr-16 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              />
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs transition-colors ${
                  isAtLimit
                    ? "text-destructive"
                    : isNearLimit
                      ? "text-amber-500"
                      : "text-muted-foreground"
                }`}
              >
                {characterCount}/{MAX_CHARACTERS}
              </span>
            </div>
            <Button
              onClick={handleApplyName}
              disabled={!hasChanges}
              size="default"
              className="shrink-0"
            >
              Apply
            </Button>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleExport}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export as PNG</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isAtLimit && (
            <p className="mt-1.5 text-xs text-destructive">
              Character limit reached
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
