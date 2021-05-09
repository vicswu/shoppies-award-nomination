import axios from "axios";

export const getMoviesOMDB = async ({ title, releaseDate, page }) => {
  let results = await axios.get(`https://www.omdbapi.com/`, {
    params: {
      apikey: process.env.REACT_APP_OMDB_API_KEY,
      type: "movie",
      s: title,
      y: releaseDate,
      page,
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
