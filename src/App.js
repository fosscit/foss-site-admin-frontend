import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyEvents from "./screens/MyEvents/MyEvents";
import SingleEvent from "./screens/SingleEvent/SingleEvent";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateEvent from "./screens/SingleEvent/CreateEvent";
import { useState } from "react";
import Graph from "./screens/DashboardPage/graph"
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import MyMessages from "./screens/MyMessages/MyMessages";
import Members from "./screens/Members/Members";
import CreateMember from "./screens/AddMemberScreen/AddMemberScreen";
import EditMember from "./screens/EditMember/EditMember";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        
        <Route path="/graph" component={Graph} />

        <Route
          path="/myevents"
          component={({ history }) => (
            <MyEvents search={search} history={history} />
          )}
        />
        <Route
          path="/mymessages"
          component={({ history }) => (
            <MyMessages search={search} history={history} />
          )}
        />
        <Route
          path="/members"
          component={({ history }) => (
            <Members search={search} history={history} />
          )}
        />
        <Route path="/event/:id" component={SingleEvent} />
        <Route path="/createevent" component={CreateEvent} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/addmember" component={CreateMember} />
        <Route path="/member/:id" component={EditMember} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
