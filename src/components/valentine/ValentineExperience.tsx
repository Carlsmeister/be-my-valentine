import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "./FloatingHearts";

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
  onYes: () => void;
  onNo: () => void;
}

/**
 * ValentineExperience - The main interactive Valentine's page
 * Features an escaping "No" button and playful animations
 */
const ValentineExperience = ({ fromName, onYes, onNo }: ValentineExperienceProps) => {
  const [escapeCount, setEscapeCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isWiggling, setIsWiggling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Handle the "No" button escape animation
  const handleNoHover = useCallback(() => {
    if (escapeCount >= MAX_ESCAPES) return;

    // Trigger wiggle animation
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 300);

    // Calculate new random position within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = 200;
    const buttonHeight = 60;
    const padding = 20;

    const maxX = viewportWidth - buttonWidth - padding * 2;
    const maxY = viewportHeight - buttonHeight - padding * 2;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
    setEscapeCount((prev) => prev + 1);
  }, [escapeCount]);

  // Handle touch events for mobile
  const handleNoTouch = useCallback((e: React.TouchEvent) => {
    if (escapeCount >= MAX_ESCAPES) return;
    e.preventDefault();
    handleNoHover();
  }, [escapeCount, handleNoHover]);

  const canClickNo = escapeCount >= MAX_ESCAPES;
  const currentNoText = NO_BUTTON_TEXTS[Math.min(escapeCount, NO_BUTTON_TEXTS.length - 1)];

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 valentine-gradient relative overflow-hidden"
    >
      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Main content */}
      <div className="text-center space-y-8 z-10 max-w-lg mx-auto">
        {/* Romantic headline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary animate-bounce-soft">
            Hey, You... 💕
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            So I've been thinking...{" "}
            <span className="block mt-2 text-2xl md:text-3xl font-semibold text-primary">
              Will you be my Valentine? 🥺👉👈
            </span>
          </p>
          
          {/* Personalization from sender */}
          {fromName && (
            <p className="text-lg text-muted-foreground italic mt-4">
              - From {fromName}
            </p>
          )}
        </div>

        {/* Response buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          {/* YES Button - Always prominent and clickable */}
          <Button
            onClick={onYes}
            className="text-xl px-12 py-8 rounded-full bg-primary hover:bg-primary/90 
                       button-glow-pink animate-pulse-glow transition-all duration-300 
                       hover:scale-110 active:scale-95 min-w-[200px]"
          >
            Aww, yes! 💘
          </Button>

          {/* NO Button - Escapes the cursor! */}
          <Button
            ref={noButtonRef}
            onClick={canClickNo ? onNo : undefined}
            onMouseEnter={!canClickNo ? handleNoHover : undefined}
            onTouchStart={!canClickNo ? handleNoTouch : undefined}
            variant="outline"
            className={`text-lg px-8 py-6 rounded-full transition-all duration-300 min-w-[200px]
                       border-2 border-destructive text-destructive hover:bg-destructive/10
                       ${isWiggling ? "animate-wiggle" : ""}
                       ${canClickNo ? "cursor-pointer" : "cursor-not-allowed"}
                       ${!canClickNo ? "hover:scale-105" : ""}`}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {currentNoText}
          </Button>
        </div>

        {/* Escape counter hint */}
        {escapeCount > 0 && escapeCount < MAX_ESCAPES && (
          <p className="text-sm text-muted-foreground animate-fade-in">
            {MAX_ESCAPES - escapeCount} more {MAX_ESCAPES - escapeCount === 1 ? "try" : "tries"} until you can say no... 
            {escapeCount >= 3 ? " But do you really want to? 🥺" : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default ValentineExperience;
