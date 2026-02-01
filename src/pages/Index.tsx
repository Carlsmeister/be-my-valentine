import { useState, useEffect, useCallback } from "react";
import SetupForm from "@/components/valentine/SetupForm";
import ValentineExperience from "@/components/valentine/ValentineExperience";
import CelebrationScreen from "@/components/valentine/CelebrationScreen";
import FloatingHearts from "@/components/valentine/FloatingHearts";
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
    method: ContactMethod;
    contact: string;
  } | null>(null);

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
  switch (screen) {
    case "valentine":
      return (
        <ValentineExperience
          fromName={valentineConfig?.fromName}
          onYes={handleYes}
          onNo={handleNo}
        />
      );

    case "celebration":
      return (
        <CelebrationScreen
          isYes={isYesResponse}
          onComplete={handleCelebrationComplete}
        />
      );

    case "setup":
    default:
      return (
        <>
          <FloatingHearts />
          <SetupForm onGenerate={handleLinkGenerated} />
        </>
      );
  }
};

export default Index;
