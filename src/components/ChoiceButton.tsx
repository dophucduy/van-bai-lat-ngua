import type { Choice } from "../game/types";

interface ChoiceButtonProps {
  choice: Choice;
  disabled?: boolean;
  variant?: "primary" | "alt";
  onSelect: (choice: Choice) => void;
}

export function ChoiceButton({ choice, disabled, variant = "primary", onSelect }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      className={"choice" + (variant === "alt" ? " alt" : "")}
      disabled={disabled}
      onClick={() => onSelect(choice)}
      aria-label={`Lựa chọn ${choice.code}: ${choice.label}`}
    >
      <span className="code" aria-hidden="true">{choice.code}</span>
      <span className="label">{choice.label}</span>
      <span className="desc">{choice.description}</span>
    </button>
  );
}
