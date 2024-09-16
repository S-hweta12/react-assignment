import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./JestReduxWrapper"; // Import the custom render function
import '@testing-library/jest-dom/extend-expect';
import App from "./App";

describe("App Routing", () => {
  let route: string;

  const renderWithRouter = () => {
    return render(<App />, {
      initialEntries: [route],
    });
  };

  beforeEach(() => {
    route = "/"; // Default route before each test
  });

  it("redirects '/' to '/stocks'", () => {
    route = "/";
    renderWithRouter();
    
    expect(screen.getByTestId("main-page-wrapper")).toBeInTheDocument();
  });

  it("renders the Main stocks page when '/stocks' is visited", () => {
    route = "/stocks";
    renderWithRouter();

    expect(screen.getByTestId("main-page-wrapper")).toBeInTheDocument();
  });
});
