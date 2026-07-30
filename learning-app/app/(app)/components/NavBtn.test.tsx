import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

//___________________Inport composant à tester____________________

import NavBtn from "./NavBtn";

//___________________ Function factice ___________________________
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),

  usePathname: () => "/",
}));

describe("bouton navigation Menu", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  const routes = [
    { label: "Vue d'ensemble", route: "accueil" },
    { label: "Roadmap", route: "roadmap" },
    { label: "Memo", route: "memo" },
    { label: "Gestion", route: "gestion" },
    { label: "Profil", route: "profil" },
  ];

  it.each(routes)(
    "appel btn navigation '$routes'.}",
    async ({ label, route }) => {
      const user = userEvent.setup();

      render(<NavBtn idProject="123+" />);

      const bouton = screen.getByRole("button", {
        name: label,
      });

      await user.click(bouton);

      expect(pushMock).toHaveBeenCalledWith(`/${route}?project=123+`);
    },
  );
});
