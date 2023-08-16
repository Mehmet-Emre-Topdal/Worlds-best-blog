import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FiltersProvider from "./context/filtersContext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <FiltersProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </FiltersProvider>
  </QueryClientProvider>
);
