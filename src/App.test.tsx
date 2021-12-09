import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import App from "./App";

const rickMockedData = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    "https://rickandmortyapi.com/api/episode/3",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

const axios = require("axios");
jest.mock("axios");

beforeEach(() => {
  jest.resetAllMocks();
});

test("can display loader", async () => {
  // arrange
  axios.get.mockResolvedValue({
    data: { results: [], info: {} },
  });

  // act
  act(() => {
    render(<App />);
  });
  const loader = screen.getByText(/loading/i);
  await act(async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  // assert
  expect(loader).toBeInTheDocument();
});

test("can display character lists", async () => {
  // arrange
  axios.get.mockResolvedValue({
    data: {
      info: {
        count: 826,
        next: "foo",
        pages: 42,
        prev: "bar",
      },
      results: [rickMockedData],
    },
  });

  // act
  await act(async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });
  const startPagination = screen.getByText("1");
  const endPagination = screen.getByText("42");
  const name = screen.getByText(rickMockedData.name);
  const image: any = screen.getByAltText("avatar");

  // assert
  expect(startPagination).toBeInTheDocument();
  expect(endPagination).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(name.textContent).toBe(rickMockedData.name);
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(rickMockedData.image);
});

// TODO: split this to test separate navigation and displayed separately
test("can navigate to character page", async () => {
  // arrange
  axios.get.mockResolvedValue({ data: rickMockedData });
  axios.get.mockImplementation((url: string) => {
    switch (url) {
      case "https://rickandmortyapi.com/api/character?page=1":
        return Promise.resolve({
          data: {
            info: {
              count: 826,
              next: "foo",
              pages: 42,
              prev: "bar",
            },
            results: [rickMockedData],
          },
        });
      case "https://rickandmortyapi.com/api/character/1":
        return Promise.resolve({ data: rickMockedData });
      default:
        return Promise.reject(new Error("not found"));
    }
  });

  // act
  await act(async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const item: any = screen.getByText(rickMockedData.name);
    item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await waitFor(() => screen.getByAltText(/avatar/i));
  });

  const species: any = screen.getByText(rickMockedData.species);
  const gender: any = screen.getByText(rickMockedData.gender);
  const origin: any = screen.getByText(rickMockedData.origin.name);
  const location: any = screen.getByText(rickMockedData.location.name);
  const appearances: any = screen.getByText(rickMockedData.episode.length);

  // assert
  expect(species).toBeInTheDocument();
  expect(gender).toBeInTheDocument();
  expect(origin).toBeInTheDocument();
  expect(location).toBeInTheDocument();
  expect(appearances).toBeInTheDocument();
});

/**
 * TODOs:
 * - fully test character page (img.src, alive, ...)
 * - test navigation back to home page
 * - test home pagination
 */
