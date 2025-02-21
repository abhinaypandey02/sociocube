export function instagramRapidAPI(path: string) {
  return fetch(`https://instagram-scraper-api2.p.rapidapi.com/v1/${path}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
    },
  }).then((res) => res.json());
}
