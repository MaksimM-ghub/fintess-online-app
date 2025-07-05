import { UserMeResponse, RegisterType, LoginType } from "../../types/apiType/apiType";
import axios, { AxiosError } from "axios";
import { validationResponse } from "./validateResponse";

const API_URL = 'http://localhost:3000'

type ServerError = {
  message: string;
};

export async function fetchMe(): Promise<UserMeResponse> {
  try {
    const response = await axios.get(`${API_URL}/me`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    return response.data
  }
  catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function login({ email, password }: LoginType): Promise<void> {
  try {
    await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      throw serverError.response?.data;
    }
  }
}

export async function register({ name, surname, email, password }: RegisterType): Promise<void> {
  try {
    await axios.post(
      `${API_URL}/register`,
      {
        name,
        surname,
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      throw serverError.response?.data;
    }
  }
}

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
