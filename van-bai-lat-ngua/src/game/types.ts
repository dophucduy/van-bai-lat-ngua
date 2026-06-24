export type StatKey = "money" | "burnout" | "flexing" | "skill";

export type Stats = Record<StatKey, number>;

export type ChoiceCode =
  | "A"
  | "B"
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "HEAL"
  | "GRIND"
  | "X"
  | "Y";

export type EndingId = "ending-1" | "ending-2" | "ending-3";

export type NodeId =
  | "step-1"
  | "step-2-creator"
  | "step-2-shipper"
  | "step-3"
  | "step-4"
  | "step-5"
  | EndingId;

export interface Choice {
  code: ChoiceCode;
  label: string;
  description: string;
  effectText: string;
  statDelta: Partial<Stats>;
  nextNodeId: NodeId;
  tags?: string[];
}

export interface StoryNode {
  id: NodeId;
  step: number;
  title: string;
  body: string;
  choices: Choice[];
}

export interface Ending {
  id: EndingId;
  title: string;
  summary: string;
  hostCommentary: string;
  finalStats: Stats;
  conceptTags: string[];
}

export interface StoryData {
  initialNodeId: NodeId;
  initialStats: Stats;
  nodes: StoryNode[];
  endings: Ending[];
}

export interface GameState {
  currentNodeId: NodeId;
  stats: Stats;
  selectedChoices: ChoiceCode[];
  isFinished: boolean;
  endingId?: EndingId;
}
