import { AuthSource } from "@/interfaces";
import { URL, URLSearchParams } from "url";
import { objectToURLSearchParams } from "./url";

interface IState {
  originalState: string | null;
  searchParams?: {
    [key: string]: string | undefined
  };
}

export function updateUrlWithState(
  originalUrl: string,
  source: AuthSource,
  searchParams: {
    [x: string]: string | undefined;
  }
): string {
  // Create a URL object from the original URL
  const url = new URL(originalUrl);

  // Get the current state from the URL
  const currentState = url.searchParams.get("state");

  // Create a new state object
  const newState: IState = {
    originalState: currentState,
    ...searchParams
  };

  // Set the new state as a stringified JSON
  url.searchParams.set("state", JSON.stringify(newState));

  // Return the updated URL
  return url.toString();
}
