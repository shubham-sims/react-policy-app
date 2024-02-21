import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../App.css";
import PolicySearch from "./PolicySearch";
import NewPolicy from "./NewPolicy";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<PolicySearch />} />
          <Route path='/create-policy' element={<NewPolicy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
