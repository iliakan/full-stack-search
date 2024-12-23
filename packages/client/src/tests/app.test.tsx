import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type Mock,
  afterEach,
} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getSearch } from "@/services/get-search";
import App from "../app";
import { mockSearchResult } from "./mocks/search";
import config from "@/config";

vi.mock("@/services/get-search", () => ({
  getSearch: vi.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    (getSearch as Mock).mockResolvedValue(mockSearchResult);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<App />);
    const input = screen.getByTestId("search-accomodation");
    expect(input).toBeInTheDocument();
  });

  it("performs debounced search", async () => {
    render(<App />);

    const input = screen.getByTestId("search-accomodation");

    userEvent.type(input, "au");

    // fixme: mock timers
    await new Promise((resolve) =>
      setTimeout(resolve, config.search.debounce / 2)
    );

    // not called yet (debouncing...)
    expect(getSearch).not.toHaveBeenCalled();

    await new Promise((resolve) =>
      setTimeout(resolve, config.search.debounce / 2)
    );

    // now it should called!
    await waitFor(() => {
      expect(getSearch).toHaveBeenCalledWith("au");
    });

    expect(screen.getByText("Hotels")).toBeInTheDocument();
    expect(screen.getByText("Countries")).toBeInTheDocument();
    expect(screen.getByText("Cities")).toBeInTheDocument();

    const hotelsSection = screen.getByTestId("search-result-hotels");
    expect(hotelsSection).toHaveTextContent("Pullman Bordeaux Lac");
    expect(hotelsSection).toHaveTextContent(
      "Staybridge Suites Austin Round Rock"
    );

    const citiesSection = screen.getByTestId("search-result-cities");
    expect(citiesSection).toHaveTextContent("Auckland");
    expect(citiesSection).toHaveTextContent("Macau");
    expect(citiesSection).toHaveTextContent("Bordeaux");

    const countriesSection = screen.getByTestId("search-result-countries");
    expect(countriesSection).toHaveTextContent("Macau");
  });
});
