import { Github } from "lucide-react";

const CreatedBy = () => (
  <div className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-10 flex justify-center sm:bottom-6">
    <a
      href="https://github.com/carlsmeister"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur hover:bg-primary/25"
    >
      <Github className="h-5 w-5" />
      Created with Love - Carlsmeister
    </a>
  </div>
);

export default CreatedBy;
