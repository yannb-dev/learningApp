import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListObjective from "./ListObjective";

const acquiredMock = [
  { id: "1", name: "useState maîtrisé", moduleRef: 1, state: "Acquired" },
];
const inProgressMock = [
  { id: "2", name: "Testing Library", moduleRef: 1, state: "InProgress" },
];
const upCommingMock: never[] = [];

describe("ListObjective — filtre par bouton", () => {
  it("le bouton 'Acquis' est actif par défaut", () => {
    render(
      <ListObjective
        acquired={acquiredMock}
        inProgress={inProgressMock}
        upComming={upCommingMock}
        numberModule={1}
      />,
    );

    const boutonAcquis = screen.getByRole("button", { name: "Acquis" });
    const boutonEnCours = screen.getByRole("button", { name: "En cours" });

    expect(boutonAcquis).toHaveClass("border-amber-600", "text-amber-600");
    expect(boutonEnCours).toHaveClass("border-gray-500", "text-gray-300");
    expect(screen.getByText("useState maîtrisé")).toBeInTheDocument();
  });

  it("change le bouton actif et le contenu affiché au clic sur 'En cours'", async () => {
    const user = userEvent.setup();
    render(
      <ListObjective
        acquired={acquiredMock}
        inProgress={inProgressMock}
        upComming={upCommingMock}
        numberModule={1}
      />,
    );

    const boutonEnCours = screen.getByRole("button", { name: "En cours" });
    const boutonAcquis = screen.getByRole("button", { name: "Acquis" });

    await user.click(boutonEnCours);

    // le bouton cliqué devient actif
    expect(boutonEnCours).toHaveClass("border-amber-600", "text-amber-600");
    // l'ancien bouton actif redevient inactif
    expect(boutonAcquis).toHaveClass("border-gray-500", "text-gray-300");

    // le contenu affiché correspond au nouveau filtre
    expect(screen.getByText("Testing Library")).toBeInTheDocument();
    expect(screen.queryByText("useState maîtrisé")).not.toBeInTheDocument();
  });

  it("affiche le message d'absence quand la liste filtrée est vide", async () => {
    const user = userEvent.setup();
    render(
      <ListObjective
        acquired={acquiredMock}
        inProgress={inProgressMock}
        upComming={upCommingMock}
        numberModule={1}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Non abordé" }));

    expect(
      screen.getByText("Aucune compétences dans la section !"),
    ).toBeInTheDocument();
  });
});
