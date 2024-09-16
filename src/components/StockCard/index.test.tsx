import React from "react";
import { render } from "@testing-library/react";
import StockCard from ".";
import placeholderImage from "../../assets/placeholder-image.svg";

describe("StockCard Component", () => {
  const mockStock = {
    title: "Test Stock Title",
    url: "/test-stock",
    image: "test-image.jpg",
    date: "2024-09-16T10:00:00.000Z",
    body: "<p>This is a test stock description.</p>",
    source: "Test Source",
    author: "Test Author",
  };

  it("renders stock title", () => {
    const { getByText } = render(<StockCard {...mockStock} />);
    expect(getByText("Test Stock Title")).toBeInTheDocument();
  });

  it("renders formatted date correctly", () => {
    const { getByText } = render(<StockCard {...mockStock} />);
    expect(getByText("September 16, 2024")).toBeInTheDocument();
  });

  it("renders source name", () => {
    const { getByText } = render(<StockCard {...mockStock} />);
    expect(getByText("Test Source")).toBeInTheDocument();
  });

  it("renders author name", () => {
    const { getByText } = render(<StockCard {...mockStock} />);
    expect(getByText("Test Author")).toBeInTheDocument();
  });

  it("renders body HTML correctly", () => {
    const { getByText } = render(<StockCard {...mockStock} />);
    expect(getByText("This is a test stock description.")).toBeInTheDocument();
  });

  it("renders the placeholder image when no image is provided", () => {
    const { getByAltText } = render(
      <StockCard {...mockStock} image={undefined} />
    );
    const imageElement = getByAltText("placeholder image");
    expect(imageElement).toHaveAttribute("src", placeholderImage);
  });

  it("does not render the formatted date if date is not provided", () => {
    const { queryByText } = render(
      <StockCard {...mockStock} date={undefined} />
    );
    expect(queryByText("September 16, 2024")).not.toBeInTheDocument();
  });
});
