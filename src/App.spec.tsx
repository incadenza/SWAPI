import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const searchQuery = "mockSearchQuery";
const baseURL = "https://swapi.dev/api";
const createUserURL = (id: string) => `${baseURL}/people/${id}`;

// Create a mock database of people
const people = {
  "12": "Luke Skywalker",
  "14": "Han Solo",
  "75": "Chewbacca",
  "26": "Yoda",
  "89": "Princess Leia",
  "101": "Darth Vader",
  "400": "Kylo Ren",
  "300": "Rey",
};

const userIDs = Object.keys(people);

// Mock query responses for all resources
const responses = {
  films: [
    { title: "Fancy Star Wars Movie", characters: [createUserURL(userIDs[0])] },
  ],
  people: [{ name: people["400"] }, { name: people["300"] }],
  planets: [
    { name: "Tatooine", residents: [createUserURL(userIDs[1])] },
    { name: "Earth", residents: [createUserURL(userIDs[2])] },
  ],
  species: [{ name: "Wookie", people: [createUserURL(userIDs[4])] }],
  starships: [
    {
      name: "Millenium Falcon",
      pilots: [createUserURL(userIDs[3])],
    },
  ],
  vehicles: [{ name: "Car", pilots: [createUserURL(userIDs[5])] }],
};

const searchResponses = Object.entries(responses).map(([resource, results]) => {
  return http.get(`${baseURL}/${resource}`, () => {
    return HttpResponse.json({ results });
  });
});

// Mock query responses for individual people
const peopleResponses = Object.entries(people).map(([id, name]) => {
  return http.get(`${baseURL}/people/${id}`, () => {
    return HttpResponse.json({ name });
  });
});

// Setup our server
const allResponses = [...peopleResponses, ...searchResponses];
const server = setupServer(...allResponses);

server.listen();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Ensure all people are rendered by our search query
it("displays the results of the search query", async () => {
  render(<App />);

  const input = await screen.findByPlaceholderText("Search!");
  fireEvent.change(input, { target: { value: searchQuery } });

  await fireEvent.click(
    screen.getByRole("button", {
      name: "Search",
    })
  );

  for await (const person of Object.values(people)) {
    await screen.findAllByText(person);
  }
});
