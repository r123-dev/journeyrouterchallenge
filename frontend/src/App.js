import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Adhar from './components/Adhar';
import User from './components/User';
function App() {
  return (
    <div>
    <Router>
      
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/aadhar" element={<Adhar />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
