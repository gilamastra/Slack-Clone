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
import { CgArrowLongRightL } from "react-icons/cg";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";
function App() {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [showSidebar, setShowSidebar] = useState(false);

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
              <SidebarClass
                user={user}
                showSidebar={showSidebar}
                rooms={rooms}
                addChannel={addChannel}
              ></SidebarClass>
              <Switch>
                <Route path="/room/:channelId">
                  <ChatAnimation
                    className={
                      showSidebar
                        ? "animationChatAnimationShow"
                        : "animationChatAnimationHide"
                    }
                  >
                    {showSidebar ? (
                      <DoubleRightIcon
                        onClick={() => setShowSidebar(!showSidebar)}
                      />
                    ) : (
                      <DoubleLeftIcon
                        onClick={() => setShowSidebar(!showSidebar)}
                      />
                    )}
                    <Chat showSidebar={showSidebar} user={user} />
                  </ChatAnimation>
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

const DoubleRightIcon = styled(AiOutlineDoubleRight)`
  display: none;
  font-size: 55px;
  cursor: pointer;
  position: absolute;
  color: #641666;
  left: -25px;
  @media screen and (max-width: 680px) {
    display: block;
  }
`;
const DoubleLeftIcon = styled(AiOutlineDoubleLeft)`
  display: none;
  font-size: 55px;
  cursor: pointer;
  position: absolute;
  color: #641666;
  left: -25px;
  @media screen and (max-width: 680px) {
    display: block;
  }
`;
const Container = styled.div`
  height: calc(100vh - 35px);
  display: flex;
  width: 100vw;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const SidebarClass = styled(Sidebar)`
  height: 100%;
`;

const ChatAnimation = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;
