import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Forum from "./components/Forum/Forum";
import Polling from "./components/Polling/Polling";
import PollDetails from "./components/PollDetails/PollDetails";
import AddPoll from "./components/AddPoll/AddPoll";
import Footer from "./components/Footer/Footer";

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
        <Route path='/polling/:pollId' element={<PollDetails />} />
        <Route path='/polling/add' element={<AddPoll />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
