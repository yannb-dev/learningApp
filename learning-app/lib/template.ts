import fs from "fs";
import path from "path";

let templateRoadmap = null;
let templateSeance = null;

export function getTemplateRoadmap() {
  if (!templateRoadmap) {
    const filePathRoadMap = path.join(
      process.cwd(),
      "public",
      "template",
      "markdownRoadMap.md",
    );
    const templateRoadmap = fs.readFileSync(filePathRoadMap, "utf-8");

    return templateRoadmap;
  }
}

export function getTemplateSeance() {
  if (!templateSeance) {
    const filePathSeance = path.join(
      process.cwd(),
      "public",
      "template",
      "markdownSeance.md",
    );
    const templateSeance = fs.readFileSync(filePathSeance, "utf-8");

    return templateSeance;
  }
}
