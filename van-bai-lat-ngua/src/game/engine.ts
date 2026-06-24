import type {
  Choice,
  ChoiceCode,
  Ending,
  EndingId,
  GameState,
  NodeId,
  StatKey,
  Stats,
  StoryData,
  StoryNode
} from "./types";

const STAT_KEYS: StatKey[] = ["money", "burnout", "flexing", "skill"];

export function createInitialState(storyData: StoryData): GameState {
  return {
    currentNodeId: storyData.initialNodeId,
    stats: normalizeStats(storyData.initialStats),
    selectedChoices: [],
    isFinished: false
  };
}

export function getCurrentNode(storyData: StoryData, state: GameState): StoryNode | undefined {
  if (state.isFinished) {
    return undefined;
  }

  return storyData.nodes.find((node) => node.id === state.currentNodeId);
}

export function getEnding(storyData: StoryData, state: GameState): Ending | undefined {
  if (!state.endingId) {
    return undefined;
  }

  return storyData.endings.find((ending) => ending.id === state.endingId);
}

export function choose(storyData: StoryData, state: GameState, choiceCode: ChoiceCode): GameState {
  if (state.isFinished) {
    return state;
  }

  const currentNode = getRequiredNode(storyData, state.currentNodeId);
  const selectedChoice = currentNode.choices.find((choice) => choice.code === choiceCode);

  if (!selectedChoice) {
    throw new Error(`Choice "${choiceCode}" is not available at node "${currentNode.id}".`);
  }

  const selectedChoices = [...state.selectedChoices, selectedChoice.code];
  const stats = applyStatDelta(state.stats, selectedChoice.statDelta);

  if (selectedChoice.nextNodeId === "step-5") {
    const endingId = resolveEnding(selectedChoices);
    const ending = getRequiredEnding(storyData, endingId);

    return {
      currentNodeId: ending.id,
      stats: normalizeStats(ending.finalStats),
      selectedChoices,
      isFinished: true,
      endingId
    };
  }

  return {
    currentNodeId: selectedChoice.nextNodeId,
    stats,
    selectedChoices,
    isFinished: false
  };
}

export function restart(storyData: StoryData): GameState {
  return createInitialState(storyData);
}

export function applyStatDelta(stats: Stats, delta: Partial<Stats>): Stats {
  return normalizeStats({
    money: stats.money + (delta.money ?? 0),
    burnout: stats.burnout + (delta.burnout ?? 0),
    flexing: stats.flexing + (delta.flexing ?? 0),
    skill: stats.skill + (delta.skill ?? 0)
  });
}

export function resolveEnding(selectedChoices: ChoiceCode[]): EndingId {
  if (selectedChoices.includes("X")) {
    return "ending-3";
  }

  if (selectedChoices.includes("A1") || selectedChoices.includes("B1")) {
    return "ending-1";
  }

  return "ending-2";
}

export function getAvailableChoices(storyData: StoryData, state: GameState): Choice[] {
  return getCurrentNode(storyData, state)?.choices ?? [];
}

function normalizeStats(stats: Stats): Stats {
  return {
    money: Math.max(0, stats.money),
    burnout: clampPercent(stats.burnout),
    flexing: clampPercent(stats.flexing),
    skill: clampPercent(stats.skill)
  };
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function getRequiredNode(storyData: StoryData, nodeId: NodeId): StoryNode {
  const node = storyData.nodes.find((candidate) => candidate.id === nodeId);

  if (!node) {
    throw new Error(`Story node "${nodeId}" does not exist.`);
  }

  return node;
}

function getRequiredEnding(storyData: StoryData, endingId: EndingId): Ending {
  const ending = storyData.endings.find((candidate) => candidate.id === endingId);

  if (!ending) {
    throw new Error(`Ending "${endingId}" does not exist.`);
  }

  return ending;
}

export const statKeys = STAT_KEYS;
