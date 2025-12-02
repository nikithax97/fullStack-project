import { test, expect } from "vitest"; 
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";

test("renders tasks", () => {
  const tasks = [
    { id: 1, title: "Test Task", completed: false }
  ];

  render(<TaskList tasks={tasks} updateTask={() => {}} deleteTask={() => {}} />);

  expect(screen.getByText("Test Task")).toBeInTheDocument();
});
