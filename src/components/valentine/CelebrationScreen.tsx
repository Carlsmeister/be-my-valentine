import { useEffect, useState } from "react";
import CreatedBy from "./CreatedBy";

interface Confetti {
  id: number;
  left: number;
  delay: number;
  emoji: string;
}

interface CelebrationScreenProps {
  isYes: boolean;
  onComplete: () => void;
}

/**
 * CelebrationScreen - Displays celebration or sad animation after button click
 * Auto-redirects to contact method after the animation
 */
const CelebrationScreen = ({ isYes, onComplete }: CelebrationScreenProps) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    if (isYes) {
      // Generate confetti for celebration
      const confettiItems: Confetti[] = [];
      const emojis = ["💕", "💖", "💗", "💘", "❤️", "🎉", "✨", "🌹"];
      
      for (let i = 0; i < 30; i++) {
        confettiItems.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        });
      }
      setConfetti(confettiItems);
    }

    // Auto-complete after animation
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [isYes, onComplete]);

  if (isYes) {
    // Happy celebration! 🎉
    return (
      <div className="h-screen overflow-hidden flex flex-col items-center justify-center p-4 valentine-gradient relative">
        <CreatedBy />
        {/* Confetti explosion */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {confetti.map((item) => (
            <div
              key={item.id}
              className="absolute text-3xl animate-confetti"
              style={{
                left: `${item.left}%`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Celebration message */}
        <div className="text-center space-y-6 z-10 animate-scale-in">
          <div className="text-8xl animate-bounce-soft">
            🎉💕🎉
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Yay!
          </h1>
          <p className="text-2xl md:text-3xl text-foreground">
            You made me the happiest! 💕
          </p>
          <p className="text-lg text-muted-foreground animate-pulse">
            Redirecting you to send your answer...
          </p>
        </div>
      </div>
    );
  }

  // Sad screen 💔
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center p-4 bg-muted/60 relative">
      <CreatedBy />
      {/* Falling broken heart */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-6xl animate-heart-drop">
        💔
      </div>

      {/* Sad message */}
      <div className="text-center space-y-6 z-10 animate-fade-in">
        <div className="text-6xl">
          😢
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-muted-foreground">
          That's okay...
        </h1>
        <p className="text-xl text-muted-foreground">
          Maybe next year? 💔
        </p>
        <p className="text-sm text-muted-foreground/70 animate-pulse">
          Redirecting...
        </p>
      </div>
    </div>
  );
};

export default CelebrationScreen;
