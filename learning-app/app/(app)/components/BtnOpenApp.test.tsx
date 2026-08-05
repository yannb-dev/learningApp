import { describe, it, expect, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

//_______________ Import des BTN navigation à tester____________
import BtnOpenApp from "./BtnOpenApp";

//_______________ Function factice _____________________________
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("bouton ouverture de l'App", () => {
  it("appelle router.push('/accueil')", async () => {
    const user = userEvent.setup();

    render(<BtnOpenApp />);

    const bouton = screen.getByRole("button", { name: "Ouvrir mon app !" });

    await user.click(bouton);

    expect(pushMock).toHaveBeenCalledWith("/accueil");
  });
});
