import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";






const App = () => (
    <BrowserRouter>
        <MainView />
    </BrowserRouter>
);

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
