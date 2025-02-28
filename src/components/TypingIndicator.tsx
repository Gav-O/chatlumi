
import { cx } from "class-variance-authority";

interface TypingIndicatorProps {
  className?: string;
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cx("typing-indicator flex items-center py-2 px-4", className)}>
      <span className="animate-typing-dot-1"></span>
      <span className="animate-typing-dot-2"></span>
      <span className="animate-typing-dot-3"></span>
    </div>
  );
}
