import { AppData, Resource } from "./api";

const emojiMap: Record<Resource, string> = {
  starships: "🚀",
  people: "🧍",
  films: "🎬",
  species: "👽",
  planets: "🪐",
  vehicles: "🚙",
};

const SearchResult = ({ result }: { result: AppData }) => {
  if (result.resource === "people") {
    return (
      <tr key={`${result.name}-${result.name}`}>
        <td>{emojiMap[result.resource]}</td>
        <td>{result.name}</td>
        <td>{result.name}</td>
      </tr>
    );
  }

  return (
    <>
      {result.people.map((p) => {
        return (
          <tr key={`${result.name}-${p}`}>
            <td>{emojiMap[result.resource]}</td>
            <td>{result.name}</td>
            <td>{p}</td>
          </tr>
        );
      })}
    </>
  );
};

export default SearchResult;
