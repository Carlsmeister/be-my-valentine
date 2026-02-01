import { useState, useEffect, useCallback, useMemo } from "react";
import SetupForm from "@/components/valentine/SetupForm";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import CelebrationScreen from "@/components/valentine/CelebrationScreen";
import FloatingHearts from "@/components/valentine/FloatingHearts";
import TextCursor from "@/components/valentine/TextCursor";
import Aurora from "@/components/valentine/Aurora";
import { parseValentineParams, getRedirectUrl } from "@/lib/contactRedirect";
import type { ContactMethod } from "@/lib/contactRedirect";

type Screen = "setup" | "valentine" | "celebration";

/**
 * Index - Main page component for the Valentine's Day app
 * 
 * Handles two main flows:
 * 1. Setup flow (no URL params) - User configures their Valentine message
 * 2. Valentine flow (with URL params) - Recipient sees the Valentine question
 */
const Index = () => {
  const [screen, setScreen] = useState<Screen>("setup");
  const [isYesResponse, setIsYesResponse] = useState(false);
  const [valentineConfig, setValentineConfig] = useState<{
    fromName?: string;
    toName?: string;
    method: ContactMethod;
    contact: string;
  } | null>(null);
  const auroraStops = useMemo(() => ["#ff6aa2", "#ff9ac2", "#ff3b6f"], []);

  // Check URL params on mount to determine which screen to show
  useEffect(() => {
    const config = parseValentineParams();
    if (config) {
      // This is a Valentine link - show the experience
      setValentineConfig(config);
      setScreen("valentine");
    }
    // Otherwise, stay on setup screen
  }, []);

  // Handle "Yes" button click
  const handleYes = useCallback(() => {
    setIsYesResponse(true);
    setScreen("celebration");
  }, []);

  // Handle "No" button click (after all escapes)
  const handleNo = useCallback(() => {
    setIsYesResponse(false);
    setScreen("celebration");
  }, []);

  // Handle celebration complete - redirect to contact method
  const handleCelebrationComplete = useCallback(() => {
    if (valentineConfig) {
      const redirectUrl = getRedirectUrl(
        valentineConfig.method,
        valentineConfig.contact,
        isYesResponse
      );
      window.location.href = redirectUrl;
    }
  }, [valentineConfig, isYesResponse]);

  // Handle link generation (just for feedback, link is in URL bar)
  const handleLinkGenerated = useCallback((link: string) => {
    console.log("Valentine link generated:", link);
  }, []);

  // Render based on current screen
  let screenContent: JSX.Element;
  switch (screen) {
    case "valentine":
      screenContent = (
        <ValentineExperience
          fromName={valentineConfig?.fromName}
          toName={valentineConfig?.toName}
          onYes={handleYes}
          onNo={handleNo}
        />
      );
      break;
    case "celebration":
      screenContent = (
        <CelebrationScreen
          isYes={isYesResponse}
          onComplete={handleCelebrationComplete}
        />
      );
      break;
    case "setup":
    default:
      screenContent = (
        <>
          <FloatingHearts />
          <SetupForm onGenerate={handleLinkGenerated} />
        </>
      );
      break;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={auroraStops}
          blend={0.7}
          amplitude={0.7}
          speed={1.5}
        />
      </div>
      <div className="relative z-10">
        <TextCursor
          text="💖"
          spacing={80}
          followMouseDirection
          randomFloat
          exitDuration={0.3}
          removalInterval={20}
          maxPoints={10}
          className="pointer-events-none"
        />
        {screenContent}
      </div>
    </div>
  );
};

export default Index;
