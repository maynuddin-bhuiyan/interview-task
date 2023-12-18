// react Toaster import
import { Toaster } from "react-hot-toast";
// react router import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// project import
import PrivateRoutes from "./components/PrivateRoutes";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
