# SWAPI

This is a simple website to display any Star Wars characters associated with a given entity. For example, searching `mil` for the Millenium Falcon, will return the associated crew, along with the entity that was found by your search. You can also simply search for people directly.

Feel free to play around with a live version of the website here: [https://master--venerable-figolla-066296.netlify.app/]()

## Running Locally

This app uses [https://pnpm.io/](PNPM) and can be run locally by simply cloing this repo and running `pnpm i && pnpm run dev`.

## Testing

Tests can be run via `pnpm test`. Since the app relies primarily on manipulating API responses, the testing suite leans heavily on integration tests, rather than component or UI testing.

## High Volume Environment

This app expects a relatively small number of users. For higher workloads, the API latency (and usage limits) would become a major problem. If higher volume was expected, I'd pursuit an edge caching solution with our own custom backend. Alternatively, since there are only about 260 or so custom resources (and we only need a few fields), all of this data could be served from memory on our own server with one API request from the client - and the search could be done in the browser. We could ping the SWAPI API periodically if any new Star Wars movies come out!
