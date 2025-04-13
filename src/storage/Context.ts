import { createContext, Dispatch } from "react";
import { AppAction, AppState } from "./types";
import InitialState from "./InitialState";

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

// Default context with undefined dispatch that will be filled in App.tsx
const defaultContext: AppContextType = {
  state: InitialState,
  dispatch: () => undefined,
};

const Context = createContext<AppContextType>(defaultContext);

export default Context;
