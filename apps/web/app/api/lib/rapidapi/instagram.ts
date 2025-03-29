export function instagramRapidAPI(path: string) {
  return fetch(`https://social-api4.p.rapidapi.com/v1/${path}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": "social-api4.p.rapidapi.com",
    },
  }).then((res) => res.json());
}
