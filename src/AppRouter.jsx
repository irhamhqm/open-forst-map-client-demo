import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot_password";
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
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/forgot"
            element={<ForgotPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
