import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import DetailsProvider from "./context/DetailsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DetailsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DetailsProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
