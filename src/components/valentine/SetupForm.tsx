import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import CreatedBy from "./CreatedBy";

// Contact method configurations
const CONTACT_METHODS = {
  email: {
    label: "Email",
    placeholder: "your-email@example.com",
    hint: "Enter your email address",
  },
  sms: {
    label: "SMS / Text",
    placeholder: "+1234567890",
    hint: "Enter your phone number with country code",
  },
  whatsapp: {
    label: "WhatsApp",
    placeholder: "+1234567890",
    hint: "Enter your WhatsApp number with country code",
  },
  snapchat: {
    label: "Snapchat",
    placeholder: "username",
    hint: "Enter your Snapchat username",
  },
  instagram: {
    label: "Instagram",
    placeholder: "username",
    hint: "Enter your Instagram username (without @)",
  },
  messenger: {
    label: "Facebook Messenger",
    placeholder: "username or user ID",
    hint: "Enter your Messenger username or user ID",
  },
} as const;

type ContactMethod = keyof typeof CONTACT_METHODS;

interface SetupFormProps {
  onGenerate: (link: string) => void;
}

/**
 * SetupForm - Configuration form for the Valentine sender
 * Allows customization of name and contact method, generates shareable link
 */
const SetupForm = ({ onGenerate }: SetupFormProps) => {
  const [name, setName] = useState("");
  const [valentine, setValentine] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("whatsapp");
  const [contactInfo, setContactInfo] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerate = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!contactInfo.trim()) {
      toast.error("Please enter contact information");
      return;
    }

    // Encode settings into URL parameters
    const params = new URLSearchParams();
    if (name.trim()) params.set("from", name.trim());
    if (valentine.trim()) params.set("to", valentine.trim());
    params.set("method", contactMethod);
    params.set("contact", contactInfo.trim());

    // Generate the shareable link
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?${params.toString()}`;
    
    setGeneratedLink(link);
    onGenerate(link);
    toast.success("Your Valentine link is ready! 💕");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied to clipboard! 💝");
  };

  return (
    <div className="h-screen overflow-hidden flex items-start sm:items-center justify-center px-3 pt-6 pb-20 sm:p-4 valentine-gradient">
      <Card className="relative w-full max-w-sm sm:max-w-md border-white/60 bg-white/20 backdrop-blur-2xl shadow-[0_24px_70px_-24px_rgba(0,0,0,0.4)] ring-1 ring-white/70 overflow-hidden">
        <CreatedBy containerClassName="absolute left-3 top-3 z-20 flex" compact label="Created with Love" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.25)_38%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0)_100%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.2)_100%)]"
        />
        <CardHeader className="relative z-10 text-center space-y-1 sm:space-y-2">
          <div className="text-4xl sm:text-5xl mb-1 sm:mb-2">💘</div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
            Ask Your Valentine
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Set up your personalized Valentine's Day message
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-4 sm:space-y-6">

          {/* Valentine Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground text-sm sm:text-base">
              Valentine (Optional)
            </Label>
            <Input
                id="name"
                placeholder="Enter your Valentine's name"
                value={valentine}
                onChange={(e) => setValentine(e.target.value)}
                className="border-input focus:ring-primary text-sm sm:text-base"
            />
          </div>

          {/* Sender Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground text-sm sm:text-base">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-input focus:ring-primary text-sm sm:text-base"
            />
          </div>

          {/* Contact Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="method" className="text-foreground text-sm sm:text-base">
              How should they reply?
            </Label>
            <Select
              value={contactMethod}
              onValueChange={(value) => setContactMethod(value as ContactMethod)}
            >
              <SelectTrigger className="border-input text-sm sm:text-base">
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CONTACT_METHODS).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info Input */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-foreground text-sm sm:text-base">
              {CONTACT_METHODS[contactMethod].label} Info
            </Label>
            <Input
              id="contact"
              placeholder={CONTACT_METHODS[contactMethod].placeholder}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="border-input focus:ring-primary text-sm sm:text-base"
            />
            <p className="text-xs text-muted-foreground">
              {CONTACT_METHODS[contactMethod].hint}
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            className="w-full text-base sm:text-lg py-4 sm:py-6 bg-primary hover:bg-primary/90 button-glow-pink transition-all duration-300"
          >
            Generate My Valentine Link 💕
          </Button>

          {/* Generated Link Display */}
          {generatedLink && (
            <div className="space-y-3 p-3 sm:p-4 bg-secondary/50 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-foreground">Your link is ready!</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  readOnly
                  value={generatedLink}
                  className="text-xs bg-background border-input w-full sm:flex-1 min-w-0"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  className="w-full sm:w-auto shrink-0"
                >
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Send this link to your Valentine! 💝
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupForm;
