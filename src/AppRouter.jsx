import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import App from "./pages/map";

function AppRouter() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signin"
            element={<SignIn />}
          />
          <Route
            path="/map"
            element={<App />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
