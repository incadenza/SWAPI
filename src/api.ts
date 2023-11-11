const baseURL = `https://swapi.dev/api/`;

const resourceKeys = {
    films: "characters",
    starships: "pilots",
    planets: "residents",
    species: "people",
    vehicles: "pilots",
    people: ""
} as const;

export type Resource = keyof typeof resourceKeys
export type AppData = {
    resource: Resource,
    people: string[]
    name: string,
}

type PersonKey = typeof resourceKeys[keyof typeof resourceKeys]
type Result = { [R in PersonKey]?: string[] } & { name: string, title: string }
type SWAPIResponse = { results: Result[] }

const searchAllResources = async (term: string): Promise<AppData[]> => {
    const resources: Resource[] = [
        "films",
        "people",
        "planets",
        "species",
        "starships",
        "vehicles"
    ];

    const res = await Promise.all<AppData[]>(resources.map(async (resource) => {
        const res = await fetch(`${baseURL}${resource}?search=${term}`)
        const { results } = await res.json() as SWAPIResponse;

        return results.map((r) => ({
            resource: resource,
            name: r.name || r.title,
            people: (r[resourceKeys[resource]] || []),
        }))
    }));

    return res.flat()
}

const personCache: Record<string, string> = {}
const findPerson = async (url: string) => {
    if (personCache[url]) {
        return personCache[url]
    }
    const res = await fetch(url)
    const { name } = await res.json()
    personCache[url] = name;
    return name;
}

export const search = async (term: string): Promise<AppData[]> => {
    const searchResults = await searchAllResources(term);
    return Promise.all(searchResults.map(async ({ people, name, resource }) => {
        const peopleNames = await Promise.all(people.map(async (url) => findPerson(url)))
        return { people: peopleNames, name, resource }
    }))
}
