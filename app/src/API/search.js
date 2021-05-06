import axios from "axios";

export const getMoviesOMDB = async ({ title, releaseDate }) => {
  let results = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: "8d1e95a9",
      type: "movie",
      s: title,
      y: releaseDate,
    },
  });
  let error = "";
  results.data && results.data.Error === "Too many results."
    ? (error =
        "Sorry, there are too many results for your search query. Please try again.")
    : (error =
        "Sorry, there are no results for your search query. Please try again.");

  if (results.data && results.data.Search && results.data.totalResults)
    return {
      results: results.data.Search,
      total: results.data.totalResults,
      error: "",
    };
  else return { results: [], total: 0, error: error };
};
