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
    <div className="min-h-screen flex items-center justify-center p-4 valentine-gradient">
      <CreatedBy />
      <Card className="w-full max-w-md border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="text-5xl mb-2">💘</div>
          <CardTitle className="text-2xl font-bold text-primary">
            Ask Your Valentine
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Set up your personalized Valentine's Day message
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">

          {/* Valentine Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Valentine (Optional)
            </Label>
            <Input
                id="name"
                placeholder="Enter your Valentine's name"
                value={valentine}
                onChange={(e) => setValentine(e.target.value)}
                className="border-input focus:ring-primary"
            />
          </div>

          {/* Sender Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-input focus:ring-primary"
            />
          </div>

          {/* Contact Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="method" className="text-foreground">
              How should they reply?
            </Label>
            <Select
              value={contactMethod}
              onValueChange={(value) => setContactMethod(value as ContactMethod)}
            >
              <SelectTrigger className="border-input">
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
            <Label htmlFor="contact" className="text-foreground">
              {CONTACT_METHODS[contactMethod].label} Info
            </Label>
            <Input
              id="contact"
              placeholder={CONTACT_METHODS[contactMethod].placeholder}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="border-input focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">
              {CONTACT_METHODS[contactMethod].hint}
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            className="w-full text-lg py-6 bg-primary hover:bg-primary/90 button-glow-pink transition-all duration-300"
          >
            Generate My Valentine Link 💕
          </Button>

          {/* Generated Link Display */}
          {generatedLink && (
            <div className="space-y-3 p-4 bg-secondary/50 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-foreground">Your link is ready!</p>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={generatedLink}
                  className="text-xs bg-background border-input"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  className="shrink-0"
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
