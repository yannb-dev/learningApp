import fs from "fs";
import path from "path";

//__________ import components ___________________
import MarkdownForm from "../components/MarkdownForm";
import BtnBack from "../components/BtnBack";
import RoadMapForm from "../components/RoadMapForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//___________ type _______________________________
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function GestionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = getServerSession(authOptions);

  if (!session) redirect("/login");

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
