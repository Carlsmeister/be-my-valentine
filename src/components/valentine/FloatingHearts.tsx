import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

/**
 * FloatingHearts - Animated background hearts that float upward
 * Creates a romantic atmosphere with randomly positioned, sized, and timed hearts
 */
const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate random hearts on mount
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position (0-100%)
          size: Math.random() * 20 + 15, // Size between 15-35px
          delay: Math.random() * 5, // Random delay 0-5s
          duration: Math.random() * 4 + 6, // Duration 6-10s
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-primary opacity-60"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `float-up ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
