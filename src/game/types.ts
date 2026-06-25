export type StatKey = "money" | "burnout" | "flexing" | "skill";

export type Stats = Record<StatKey, number>;

export type ChoiceCode =
  | "A"
  | "B"
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "C1"
  | "C2"
  | "S1"
  | "S2"
  | "X"
  | "Y"
  | "REVEAL";

export type EndingId = "ending-1" | "ending-2" | "ending-3";

export type NodeId =
  | "step-1"
  | "step-2-creator"
  | "step-2-shipper"
  | "step-3-creator"
  | "step-3-shipper"
  | "step-4-creator"
  | "step-4-shipper"
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
  visual: MotionVisual;
  choices: Choice[];
}

export type MotionVisualKind =
  | "crossroads"
  | "invoice"
  | "attention"
  | "debt"
  | "ai-studio"
  | "ai-map"
  | "reveal";

export interface MotionVisual {
  kind: MotionVisualKind;
  title: string;
  caption: string;
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
