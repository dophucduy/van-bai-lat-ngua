import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import assert from "node:assert/strict";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const storyPath = resolve(rootDir, "src/data/story.json");
const storyData = JSON.parse(await readFile(storyPath, "utf8"));

const nodeIds = new Set(storyData.nodes.map((node) => node.id));
const endingIds = new Set(storyData.endings.map((ending) => ending.id));
const validNextIds = new Set([...nodeIds, ...endingIds]);
const validChoicePaths = [
  ["A", "A1", "HEAL", "X"],
  ["A", "A1", "GRIND", "Y"],
  ["A", "A2", "HEAL", "Y"],
  ["B", "B1", "GRIND", "X"],
  ["B", "B2", "HEAL", "Y"]
];

assert.equal(storyData.initialNodeId, "step-1", "Initial node should be step-1.");
assert.equal(storyData.endings.length, 3, "Story should have exactly 3 endings.");

for (const node of storyData.nodes) {
  assert.ok(node.id, "Every node must have an id.");
  assert.ok(node.title, `Node ${node.id} must have a title.`);
  assert.ok(node.body, `Node ${node.id} must have body text.`);

  for (const choice of node.choices) {
    assert.ok(choice.code, `Choice in ${node.id} must have a code.`);
    assert.ok(choice.label, `Choice ${choice.code} must have a label.`);
    assert.ok(validNextIds.has(choice.nextNodeId), `Choice ${choice.code} points to missing node ${choice.nextNodeId}.`);
  }
}

for (const ending of storyData.endings) {
  assert.ok(ending.title, `Ending ${ending.id} must have a title.`);
  assert.ok(ending.summary, `Ending ${ending.id} must have a summary.`);
  assert.ok(ending.hostCommentary, `Ending ${ending.id} must have host commentary.`);
}

for (const path of validChoicePaths) {
  const endingId = resolveEnding(path);
  assert.ok(endingIds.has(endingId), `Path ${path.join(" -> ")} resolved to missing ending ${endingId}.`);
}

assert.equal(resolveEnding(["A", "A1", "GRIND", "Y"]), "ending-1");
assert.equal(resolveEnding(["B", "B1", "HEAL", "Y"]), "ending-1");
assert.equal(resolveEnding(["A", "A2", "HEAL", "Y"]), "ending-2");
assert.equal(resolveEnding(["B", "B2", "GRIND", "Y"]), "ending-2");
assert.equal(resolveEnding(["A", "A1", "HEAL", "X"]), "ending-3");
assert.equal(resolveEnding(["B", "B1", "GRIND", "X"]), "ending-3");

console.log("Story validation passed.");

function resolveEnding(selectedChoices) {
  if (selectedChoices.includes("X")) {
    return "ending-3";
  }

  if (selectedChoices.includes("A1") || selectedChoices.includes("B1")) {
    return "ending-1";
  }

  return "ending-2";
}
