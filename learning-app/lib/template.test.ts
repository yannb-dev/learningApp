import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import { getTemplateRoadmap } from "./template";

describe("getTemplateRoadmap", () => {
  it("ne relit le fichier qu'une seule fois grâce au cache", () => {
    const spy = vi.spyOn(fs, "readFileSync");

    getTemplateRoadmap();
    getTemplateRoadmap();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
