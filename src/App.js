import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import "./app.css";
import styled from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import db, { auth } from "./firebase";
import { useEffect, useState } from "react";
import SelectChannel from "./components/SelectChannel";

function App() {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [showSidebar, setShowSidebar] = useState(true);

  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, name: doc.data().name };
        })
      );
    });
  };
  const addChannel = ({ name, desc }) => {
    if (name) {
      db.collection("rooms").add({
        name: name,
        desc: desc || "",
      });
    }
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <Container>
            <Header signOut={signOut} user={user} />
            <Main>
              {showSidebar && (
                <Sidebar rooms={rooms} addChannel={addChannel} />
              )}
              <Switch>
                <Route path="/room/:channelId">
                  <Chat user={user} />
                </Route>
                <Route path="/">
                  <SelectChannel addChannel={addChannel} />
                </Route>
              </Switch>
            </Main>
          </Container>
        )}
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  height: 100%;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 220px auto;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 200px auto;
  }
  @media screen and (max-width: 680px) {
    grid-template-columns: 200px max-content;
  }
`;
