import fs from "fs";
import path from "path";

import MarkdownForm from "../components/MarkdownForm";
import BtnBack from "../components/BtnBack";
import RoadMapForm from "../components/RoadMapForm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GestionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { project } = await searchParams;

  const filePath = path.join(
    process.cwd(),
    "public",
    "template",
    "markdownRoadMap.md",
  );
  const template = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="p-6">
      <BtnBack />
      <MarkdownForm file={template} />
      <RoadMapForm idProject={project} />
    </div>
  );
}
