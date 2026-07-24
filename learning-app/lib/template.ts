import fs from "fs";
import path from "path";

export function getTemplateRoadmap() {
  let templateRoadmap: string | null = null;

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

export function getTemplateSeance() {
  let templateSeance: string | null = null;

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
