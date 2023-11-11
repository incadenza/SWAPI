import { EventHandler, useState } from "react";
import { AppData, search } from "./api";
import SearchResult from "./SearchResult";

function App() {
  const [term, setSearchTerm] = useState("");
  const [results, setResults] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onClick: EventHandler<React.SyntheticEvent> = (e) => {
    e.preventDefault();
    if (term === "") {
      setResults([]);
      return;
    }

    setIsLoading(true);
    search(term).then((results) => {
      setResults(results);
      setIsLoading(false);
    });
  };

  return (
    <div className="container">
      <header>
        <form>
          <input
            placeholder="Search!"
            onChange={({ target: { value } }) => setSearchTerm(value)}
          />
          <button type="submit" onClick={onClick}>
            Search
          </button>
        </form>
      </header>
      <main>
        {isLoading ? (
          <p>Loading...</p>
        ) : results.length ? (
          <>
            <h1>Search Results</h1>
            <table>
              <tbody>
                <tr>
                  <th>Type</th>
                  <th>Query Result</th>
                  <th>Person</th>
                </tr>
                {results.map((result, idx) => (
                  <SearchResult key={idx} result={result} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          "Search for a Star Wars entity and see the associated people!"
        )}
      </main>
    </div>
  );
}

export default App;
