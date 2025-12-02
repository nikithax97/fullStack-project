import { test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import TaskForm from "./TaskForm";

// ensure each test starts with a clean DOM
afterEach(cleanup);

test("renders input and button", () => {
  render(<TaskForm addTask={() => {}} />);

  const input = screen.getByPlaceholderText("New task...");
  const button = screen.getByRole("button", { name: /add/i });

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("submits task", () => {
  const mockAdd = vi.fn();

  render(<TaskForm addTask={mockAdd} />);

  const input = screen.getByPlaceholderText("New task...");
  fireEvent.change(input, { target: { value: "New Task" } });

  const button = screen.getByRole("button", { name: /add/i });
  fireEvent.click(button);

  expect(mockAdd).toHaveBeenCalledWith("New Task");
});
