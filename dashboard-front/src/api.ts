import axios from "axios";
import { useQuery } from "react-query";
import { Config } from "./types";

const baseURL = import.meta.env.PROD ? "/api" : "http://localhost:3001";

const agent = axios.create({
  baseURL,
});

export function getFileURL(fileName?: string) {
  if (fileName?.startsWith("http")) return fileName;
  return fileName ? baseURL + "/files/" + fileName : undefined;
}

agent.interceptors.request.use((config) => {
  const token = localStorage.getItem("BEARER_TOKEN");
  if (token && config.headers) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

agent.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    location.replace("/login");
  } else {
    throw error;
  }
});

export async function getConfig() {
  return await agent.get<Config>("/config").then((res) => res.data);
}

export function useConfig() {
  return useQuery<Config>(["config"], () => getConfig(), { staleTime: 10_000 });
}

export async function setConfig(config: Partial<Config>) {
  return await agent.patch("/config", config).then((res) => res.data);
}

export async function login(password: string) {
  return await agent.post("/login", { password }).then((res) => res.data);
}

export async function checkLogin() {
  return await agent.get("/login/check");
}

export async function reset() {
  return await agent.post("/reset").then((res) => res.data);
}

export async function upload(file: File) {
  const body = new FormData();
  body.append("file", file);
  return await agent.post<string>("/upload", body).then((res) => res.data);
}
