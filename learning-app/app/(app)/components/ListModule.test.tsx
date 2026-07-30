import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ListModule from "./ListModule";

const module = [
  {
    numModule: 1,
    objectives: [
      {
        name: "test1",
        id: "test",
        createdAt: "01/01/2021",
        index: 1,
        state: "acquired",
        moduleRef: 1,
        projectId: "test",
        moduleId: "1",
      },
    ],
    criterias: [
      {
        name: "test1",
        id: "test",
        createdAt: "01/01/2029",
        index: 1,
        moduleRef: 1,
        moduleId: "1",
      },
    ],
    practicalproject: {
      name: "test1",
      id: "test",
      numModule: 1,
      roadmapId: "123",
      createdAt: "01/01/2020",
      state: "InProgress",
      moduleId: "1",
      stack: "test",
      detail: "test",
      warning: "test",
      noteInProgress: "test",
      stepHelp: ["test", "test1"],
    },
  },
  {
    numModule: 2,
    objectives: [
      {
        name: "test1",
        id: "test",
        createdAt: "01/01/2021",
        index: 1,
        state: "acquired",
        moduleRef: 1,
        projectId: "test",
        moduleId: "1",
      },
    ],
    criterias: [
      {
        name: "test1",
        id: "test",
        createdAt: "01/01/2029",
        index: 1,
        moduleRef: 1,
        moduleId: "1",
      },
    ],
    practicalproject: {
      name: "test1",
      id: "test",
      numModule: 1,
      roadmapId: "123",
      createdAt: "01/01/2020",
      state: "InProgress",
      moduleId: "1",
      stack: "test",
      detail: "test",
      warning: "test",
      noteInProgress: "test",
      stepHelp: ["test", "test1"],
    },
  },
];

describe("ListModule - test chevron", () => {
  it("Chevron caché au montage", () => {
    render(<ListModule module={module} />);

    const chevronLeft = screen.getByRole("button", { name: "Précédent" });

    expect(chevronLeft).toHaveClass("hidden");
  });

  it("Click chevron Suivant, efface le chevron précédent", async () => {
    const user = userEvent.setup();

    render(<ListModule module={module} />);

    const chevronRight = screen.getByRole("button", { name: "Suivant" });
    const chevronLeft = screen.getByRole("button", { name: "Précédent" });

    await user.click(chevronRight);

    expect(chevronLeft).not.toHaveClass("hidden");
    expect(chevronRight).toHaveClass("hidden");
  });

  it("Click chevron Suivant, efface le chevron suivant en bout de tableau", async () => {
    const user = userEvent.setup();

    render(<ListModule module={module} />);

    const chevronRight = screen.getByRole("button", { name: "Suivant" });

    await user.click(chevronRight);

    expect(chevronRight).toHaveClass("hidden");
  });

  it("Click chevron Suivant, change le n°Module de la div", async () => {
    const user = userEvent.setup();

    render(<ListModule module={module} />);

    const chevronRight = screen.getByRole("button", { name: "Suivant" });
    const divModule = screen.getByText("Module N°1");

    await user.click(chevronRight);

    expect(divModule).toHaveTextContent("Module N°2");
  });
});
