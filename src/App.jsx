import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Form from "./components/form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Update from "./components/update";
import Blogs from './components/Blogs'

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home />}/>
        <Route path="/post" element={ <Post />}/>
        <Route path="/login" element={ <Form />}/>
        <Route path="/edit/:id" element={ <Update />}/>
        <Route path="/blog" element={ <Blogs />}/>
      </Routes>
    </Router>

  
    </>
  );
}

export default App;
