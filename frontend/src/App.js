import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Template from "./components/Template";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </Router>
  );
};

export default App;
