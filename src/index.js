import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";
import App from "./scripts/app";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
