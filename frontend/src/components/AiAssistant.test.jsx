import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AiAssistant from "./AiAssistant";

test("renders AI input", () => {
  render(<AiAssistant />);

  const textarea = screen.getByPlaceholderText(
    "Ask the AI something about your tasks..."
  );

  expect(textarea).toBeInTheDocument();
});
