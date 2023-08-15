import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./provider/StateProvider.jsx";
import reducer from "./provider/reducer.js";
import { initialState } from "./provider/initialState.js";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>
);
