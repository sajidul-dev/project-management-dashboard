export async function fetchUser() {
  const response = await fetch("/users.json")
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function getUsers() {
  const data = await fetchUser();
  return data;
}
