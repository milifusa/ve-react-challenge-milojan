// App.test.tsx
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        info: { next: null, prev: null },
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            species: "Human",
            gender: "Male",
            status: "Alive",
            image: "rick.png",
          },
          {
            id: 2,
            name: "Morty Smith",
            species: "Human",
            gender: "Male",
            status: "Alive",
            image: "morty.png",
          },
        ],
      }),
  })
) as jest.Mock;

describe("App component", () => {
  test("renders loading spinner initially", async () => {
    render(<App />);
    // Check that the spinner is initially in the document
    expect(screen.getByRole("status")).toBeInTheDocument(); // This should work now

    // Wait for the data to load and the spinner to disappear
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
  });

  test("renders character cards after data loads", async () => {
    render(<App />);
    // Wait for character cards to be rendered
    await waitFor(() =>
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument()
    );
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });
});
