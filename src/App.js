import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from './pages/Blog';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:blogId" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
