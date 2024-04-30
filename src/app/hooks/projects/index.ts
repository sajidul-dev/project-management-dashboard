async function getData() {
  const response = fetch("/data.json")
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function getMovies() {
  const data = await getData();
  return data;
}
