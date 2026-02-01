import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "./FloatingHearts";
import CreatedBy from "./CreatedBy";

// Funny "No" button texts that change with each escape
const NO_BUTTON_TEXTS = [
  "Nah, I'm cold-hearted 🥶",
  "Are you sure?? 😢",
  "Think again! 💔",
  "You're breaking my heart! 😭",
  "Please reconsider! 🥺",
  "Fine, I'll let you click me...",
  "Last chance to change your mind!",
  "Okay, okay... 😔",
];

const MAX_ESCAPES = 7;

interface ValentineExperienceProps {
  fromName?: string;
  toName?: string;
  onYes: () => void;
  onNo: () => void;
}

/**
 * ValentineExperience - The main interactive Valentine's page
 * Features an escaping "No" button and playful animations
 */
const ValentineExperience = ({
                               fromName,
                               toName,
                               onYes,
                               onNo,
                             }: ValentineExperienceProps) => {  const [escapeCount, setEscapeCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isWiggling, setIsWiggling] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const escapeCooldownRef = useRef(false);

  const handleNoHover = useCallback(() => {
    if (escapeCount >= MAX_ESCAPES) return;

    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    const container = containerRef.current;
    const button = noButtonRef.current;

    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const margin = 32;

    const currentLeft = buttonRect.left - containerRect.left;
    const currentTop = buttonRect.top - containerRect.top;

    const baseLeft = currentLeft - noButtonPosition.x;
    const baseTop = currentTop - noButtonPosition.y;

    const minX = margin - baseLeft;
    const maxX =
      containerRect.width - margin - (baseLeft + buttonRect.width);
    const minY = margin - baseTop;
    const maxY =
      containerRect.height - margin - (baseTop + buttonRect.height);

    const safeMinX = Math.min(minX, maxX);
    const safeMaxX = Math.max(minX, maxX);
    const safeMinY = Math.min(minY, maxY);
    const safeMaxY = Math.max(minY, maxY);

    if (!Number.isFinite(safeMinX) || !Number.isFinite(safeMaxX)) return;
    if (!Number.isFinite(safeMinY) || !Number.isFinite(safeMaxY)) return;

    const newX = Math.random() * (safeMaxX - safeMinX) + safeMinX;
    const newY = Math.random() * (safeMaxY - safeMinY) + safeMinY;

    setNoButtonPosition({ x: newX, y: newY });
    setEscapeCount((prev) => prev + 1);
  }, [escapeCount, noButtonPosition.x, noButtonPosition.y]);

  const triggerEscape = useCallback(() => {
    if (escapeCount >= MAX_ESCAPES) return;
    if (escapeCooldownRef.current) return;
    escapeCooldownRef.current = true;
    handleNoHover();
    setTimeout(() => {
      escapeCooldownRef.current = false;
    }, 220);
  }, [escapeCount, handleNoHover]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (escapeCount >= MAX_ESCAPES) return;
      const button = noButtonRef.current;
      const container = containerRef.current;
      if (!button || !container) return;

      const buttonRect = button.getBoundingClientRect();
      const margin = 64;
      const minX = buttonRect.left - margin;
      const maxX = buttonRect.right + margin;
      const minY = buttonRect.top - margin;
      const maxY = buttonRect.bottom + margin;

      if (
        e.clientX >= minX &&
        e.clientX <= maxX &&
        e.clientY >= minY &&
        e.clientY <= maxY
      ) {
        triggerEscape();
      }
    },
    [escapeCount, triggerEscape]
  );

  const handleNoTouch = useCallback(
      (e: React.TouchEvent) => {
        if (escapeCount >= MAX_ESCAPES) return;
        e.preventDefault();
        handleNoHover();
      },
      [escapeCount, handleNoHover]
  );

  const canClickNo = escapeCount >= MAX_ESCAPES;
  const currentNoText =
      NO_BUTTON_TEXTS[Math.min(escapeCount, NO_BUTTON_TEXTS.length - 1)];
  useEffect(() => {
    if (escapeCount >= MAX_ESCAPES) {
      setNoButtonPosition({ x: 0, y: 0 });
    }
  }, [escapeCount]);

  return (
      <div
          ref={containerRef}
          className="min-h-screen flex flex-col items-center justify-center p-4 valentine-gradient relative overflow-hidden touch-none"
          onMouseMove={handleMouseMove}
      >
        <CreatedBy />
        <FloatingHearts />

        <div className="text-center space-y-8 z-10 max-w-lg mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary animate-bounce-soft">
              Hey, {toName?.trim() || "You"}... 💕
            </h1>

            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
              So I've been thinking...
              <span className="block mt-2 text-2xl md:text-3xl font-semibold text-primary">
              Will you be my Valentine? 🥺👉👈
            </span>
            </p>

            {fromName && (
                <p className="text-lg text-muted-foreground italic mt-4">
                  – From {fromName}
                </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 relative">
            <Button
                onClick={onYes}
                className="text-xl px-12 py-8 rounded-full bg-primary hover:bg-primary/90
                       button-glow-pink animate-pulse-glow transition-all duration-300
                       hover:scale-110 active:scale-95 min-w-[200px]"
            >
              Aww, yes! 💘
            </Button>

            <Button
                ref={noButtonRef}
                onClick={canClickNo ? onNo : undefined}
                onMouseEnter={!canClickNo ? handleNoHover : undefined}
                onTouchStart={!canClickNo ? handleNoTouch : undefined}
                variant="outline"
                className={`no-button text-lg px-8 py-6 rounded-full min-w-[200px]
                       border-2 border-destructive text-destructive hover:bg-destructive/10
                       ${isWiggling ? "animate-wiggle" : ""}
                       ${canClickNo ? "cursor-pointer" : "cursor-not-allowed"}
                       ${!canClickNo ? "hover:[--no-scale:1.05]" : ""}`}
                style={{
                  ["--no-x" as never]: `${noButtonPosition.x}px`,
                  ["--no-y" as never]: `${noButtonPosition.y}px`,
                }}
            >
              {currentNoText}
            </Button>
          </div>

          {escapeCount > 0 && escapeCount < MAX_ESCAPES && (
              <p className="text-sm text-muted-foreground animate-fade-in">
                {MAX_ESCAPES - escapeCount} more{" "}
                {MAX_ESCAPES - escapeCount === 1 ? "try" : "tries"} until you can say
                no...
                {escapeCount >= 3 ? " But do you really want to? 🥺" : ""}
              </p>
          )}
        </div>
      </div>
  );
};

export default ValentineExperience;
