import { Github } from "lucide-react";

interface CreatedByProps {
  containerClassName?: string;
  compact?: boolean;
  label?: string;
}

const CreatedBy = ({ containerClassName, compact, label }) => (
  <div
    className={
      containerClassName ??
      "absolute bottom-[calc(2.5rem+env(safe-area-inset-bottom)+4.5rem)] left-0 right-0 z-10 flex justify-center sm:bottom-8"
    }
  >
    <a
      href="https://github.com/carlsmeister"
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-primary/15 font-semibold text-primary shadow-sm backdrop-blur hover:bg-primary/25 ${
        compact ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"
      }`}
    >
      <Github className={compact ? "h-4 w-4" : "h-5 w-5"} />
      {label ?? "Created with Love - Carlsmeister"}
    </a>
  </div>
);

export default CreatedBy;
