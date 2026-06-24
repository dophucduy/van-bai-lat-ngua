import { useMemo, useState } from "react";
import {
  choose,
  createInitialState,
  getCurrentNode,
  getEnding,
  restart
} from "./game";
import type { Choice, GameState } from "./game/types";
import { storyData } from "./data/story";
import { HomeScreen } from "./components/HomeScreen";
import { StoryPanel } from "./components/StoryPanel";
import { StatsPanel } from "./components/StatsPanel";
import { EndingScreen } from "./components/EndingScreen";

type Screen = "home" | "play";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [state, setState] = useState<GameState>(() => createInitialState(storyData));
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);

  const totalSteps = useMemo(() => {
    const stepNums = storyData.nodes
      .filter((n) => !n.id.startsWith("ending-"))
      .map((n) => n.step);
    return Math.max(...stepNums);
  }, []);

  const currentNode = getCurrentNode(storyData, state);
  const ending = getEnding(storyData, state);

  const handleStart = () => {
    setState(createInitialState(storyData));
    setLastChoice(null);
    setScreen("play");
  };

  const handleChoose = (choice: Choice) => {
    setLastChoice(choice);
    setState((prev) => choose(storyData, prev, choice.code));
  };

  const handleRestart = () => {
    setState(restart(storyData));
    setLastChoice(null);
    setScreen("home");
  };

  return (
    <div className="app-shell">
      <header className="poster-header">
        <div className="star" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18 22l-6-3.6L6 22l1.5-7.3L2 10l7.1-1.1L12 2z" />
          </svg>
        </div>
        <div className="titles">
          <span className="title">Ván Bài Lật Ngửa</span>
          <span className="subtitle">Gig-FOMO &amp; Cái Bẫy Thuật Toán · KTCT Mác-Lênin</span>
        </div>
        <div className="spacer" />
        {screen === "play" && !state.isFinished && currentNode && (
          <div className="step-chip" aria-label={`Bước ${currentNode.step}`}>
            ★ Bước {currentNode.step}/{totalSteps}
          </div>
        )}
        {screen === "play" && state.isFinished && (
          <button type="button" className="step-chip" onClick={handleRestart} style={{ cursor: "pointer" }}>
            ♻ Về Trang Chủ
          </button>
        )}
      </header>

      {screen === "home" && <HomeScreen onStart={handleStart} />}

      {screen === "play" && state.isFinished && ending && (
        <EndingScreen ending={ending} onRestart={handleRestart} />
      )}

      {screen === "play" && !state.isFinished && currentNode && (
        <main className="board">
          <StoryPanel
            node={currentNode}
            totalSteps={totalSteps}
            onChoose={handleChoose}
          />
          <StatsPanel
            stats={state.stats}
            totalSteps={totalSteps}
            currentStep={currentNode.step}
            lastChoice={lastChoice}
          />
        </main>
      )}

      {screen === "play" && !state.isFinished && !currentNode && (
        <main className="board">
          <section className="story-panel">
            <p>Có lỗi xảy ra với cốt truyện. Vui lòng tải lại trang.</p>
          </section>
        </main>
      )}
    </div>
  );
}
