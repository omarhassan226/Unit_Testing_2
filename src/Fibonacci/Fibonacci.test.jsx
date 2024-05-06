import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Fibonacci from "./Fibonacci";

describe("Fibonacci Function", () => {
  test("generates correct Fibonacci sequence", () => {
    render(<Fibonacci />);
    const inputNumber = 6;
    const expectedSequence = [0, 1, 1, 2, 3, 5];

    userEvent.type(screen.getByLabelText(/number/i), `${inputNumber}`);

    expect(
      screen.getByText(`Fibonacci Sequence: ${expectedSequence.join(", ")}`)
    ).toBeInTheDocument();
  });
});
