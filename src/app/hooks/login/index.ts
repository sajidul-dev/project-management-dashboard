import { Inputs } from "@/types/login";

async function userLogin() {
  const response = await fetch("/users.json")
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function getUser(email: string, password: string) {
  const data = await userLogin();
  const foundedUser = data.find(
    (user: any) => user.email === email && user.password === password
  );
  if (foundedUser) return foundedUser;
  return null;
}
