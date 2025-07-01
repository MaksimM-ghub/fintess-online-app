import { UserMeResponse, RegisterType, LoginType } from "../../types/apiType/apiType";
import { validationResponse } from "./validateResponse";

interface ApiType {
  url: string;
}

class Api implements ApiType {
  constructor(public url: string) { }

  fetchMe(): Promise<UserMeResponse> {
    return fetch(`${this.url}/me`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((data: UserMeResponse) => {
        return data;
      });
  }

  register({ name, surname, email, password }: RegisterType): Promise<void> {
    return fetch(`${this.url}/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ name, surname, email, password })
    })
      .then(validationResponse)
      .then(() => undefined)
  }

  login({ email, password }: LoginType): Promise<void> {
    return fetch(`${this.url}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then(validationResponse)
      .then(() => undefined)
  }
}

export const api = new Api('http://localhost:3000');
