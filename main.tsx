import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./responsive.css";
import "./odometer.css";
import './reminders.css';
import './tracker.css';
import App from "./App";
import { initializePwa } from './reminders/pwa';
import { AppBoundary } from './ui/AppBoundary';

initializePwa();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppBoundary><App /></AppBoundary>
  </StrictMode>
);
