import './index.css'
import App from './App.tsx'
import React from "react";
import ReactDOM from "react-dom/client";
import UserProvider from "./context/UserProvider";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);