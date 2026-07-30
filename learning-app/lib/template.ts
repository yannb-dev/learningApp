import fs from "fs";
import path from "path";

let templateRoadmap: string | null = null;
export function getTemplateRoadmap() {
  if (!templateRoadmap) {
    const filePathRoadMap = path.join(
      process.cwd(),
      "public",
      "template",
      "markdownRoadMap.md",
    );
    templateRoadmap = fs.readFileSync(filePathRoadMap, "utf-8");
  }

  return templateRoadmap;
}
let templateSeance: string | null = null;
export function getTemplateSeance() {
  if (!templateSeance) {
    const filePathSeance = path.join(
      process.cwd(),
      "public",
      "template",
      "markdownSeance.md",
    );
    templateSeance = fs.readFileSync(filePathSeance, "utf-8");
  }
  return templateSeance;
}
