import { useEffect, useState } from "react";
import type { Choice, StoryNode } from "../game/types";
import { useTypewriter } from "../hooks/useTypewriter";
import { ChoiceButton } from "./ChoiceButton";

interface StoryPanelProps {
  node: StoryNode;
  totalSteps: number;
  onChoose: (choice: Choice) => void;
}

export function StoryPanel({ node, totalSteps, onChoose }: StoryPanelProps) {
  const { output, done, skip } = useTypewriter(node.body, { speed: 18 });
  const [locked, setLocked] = useState(true);

  // Lock choices until typewriter finishes (or user skips).
  useEffect(() => {
    setLocked(true);
  }, [node.id]);

  useEffect(() => {
    if (done) setLocked(false);
  }, [done]);

  return (
    <section className="story-panel" aria-live="polite">
      <div className="eyebrow">
        <span>Bước {node.step} / {totalSteps}</span>
        <span aria-hidden="true">·</span>
        <span>Chương: {node.id}</span>
      </div>
      <h2 className="story-title">{node.title}</h2>

      <p className="story-body">
        {output}
        {!done && <span className="tw-cursor" aria-hidden="true">▍</span>}
      </p>

      {!done && (
        <button type="button" className="skip-btn" onClick={skip}>
          ⏭ Bỏ qua hiệu ứng gõ
        </button>
      )}

      <div className="choices" role="group" aria-label="Lựa chọn của bạn">
        {node.choices.map((choice, idx) => (
          <ChoiceButton
            key={choice.code}
            choice={choice}
            disabled={locked}
            variant={idx % 2 === 1 ? "alt" : "primary"}
            onSelect={onChoose}
          />
        ))}
      </div>
    </section>
  );
}
