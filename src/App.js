import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyEvents from "./screens/MyEvents/MyEvents";
import SingleEvent from "./screens/SingleNote/SingleEvent";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateEvent from "./screens/SingleNote/CreateEvent";
import { useState } from "react";
import Graph from "./graph";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import removeUser from "./screens/removeUserScreen/removeUserScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/remove" component={removeUser} />

        <Route path="/graph" component={Graph} />

        <Route
          path="/myevents"
          component={({ history }) => (
            <MyEvents search={search} history={history} />
          )}
        />
        <Route path="/event/:id" component={SingleEvent} />
        <Route path="/createevent" component={CreateEvent} />;
        <Route path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
