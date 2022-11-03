import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Polling from "./components/Polling/Polling";
import Forum from "./components/Forum/Forum";
import Login from "./components/Login/Login";

// Styles
import "./styles/partials/_resets.scss";
import "./App.scss";

// App
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/polling' element={<Polling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
