import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Menu from "./Menu";

const pushMock = vi.fn();

const projectTest = [
  {
    name: "test1",
    id: "123+",
    description: "desc",
    category: "other",
    userId: "123+",
    createdAt: "12/01/2028",
  },
  {
    name: "test2",
    id: "456+",
    description: "desc",
    category: "other",
    userId: "123+",
    createdAt: "12/01/2028",
  },
];

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),

  useSearchParams: () => new URLSearchParams(),

  usePathname: () => "/",
}));

describe("selection d'un projet par le select", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  const projectList = [
    { label: "test1", id: "123+" },
    { label: "test2", id: "456+" },
  ];

  it.each(projectList)(
    "appel correspondant au project vers URL:/accueil '$label'",

    async ({ label, id }) => {
      const user = userEvent.setup();

      render(<Menu project={projectTest} />);

      const select = screen.getByRole("combobox", {
        name: "Choisis un projet",
      });

      await user.selectOptions(select, label);
      expect(pushMock).toHaveBeenCalledWith(`/accueil?project=${id}`);
    },
  );
});
