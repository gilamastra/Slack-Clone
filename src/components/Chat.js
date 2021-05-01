import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import * as Scroll from "react-scroll";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from "../firebase";
import firebase from "firebase";
import { useHistory, useLocation, useParams } from "react-router";
const Chat = ({ user }) => {
  const [channel, setChannel] = useState([]);
  const [messages, setMessages] = useState([]);
  let { channelId } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const sendMessage = (text) => {
    if (channelId && text) {
      let payload = {
        text: text,
        user: user.name,
        userImage: user.photo,
        timestamp: firebase.firestore.Timestamp.now(),
      };
      db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add(payload);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 10000);
  }, [pathname]);

  const getMessages = () => {
    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snap) => {
        let messages = snap.docs.map((doc) => {
          return doc.data();
        });
        setMessages(messages);
      });
  };
  const getChannel = () => {
    db.collection("rooms")
      .doc(channelId)
      .onSnapshot((snapshot) => {
        setChannel(snapshot.data());
      });
  };

  const deleteChannel = () => {
    db.collection("rooms")
      .doc(channelId)
      .delete()
      .then(() => {
        history.push("/rooms");
      });
  };

  useEffect(() => {
    getMessages();
    getChannel();
  }, [channelId]);

  return (
    <Container>
      <Header>
        <Channel>
          <ChannelName>#{channel && channel.name}</ChannelName>
          <ChannelInfo>{channel && channel.desc}</ChannelInfo>
        </Channel>
        <ChannelDetails>
          <div>Details</div>
          <Info />
          <DeleteIcon onClick={() => deleteChannel()} />
        </ChannelDetails>
      </Header>

      <MessageContainer>
        {messages.length > 0 &&
          messages.map((data, index) => (
            <ChatMessage
              id={index}
              key={index}
              name={data.user}
              image={data.userImage}
              timestamp={data.timestamp}
              text={data.text}
            />
          ))}
      </MessageContainer>
      <ChatInput sendMessage={sendMessage}></ChatInput>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
`;
const Header = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83, 0.13);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const Info = styled(InfoOutlinedIcon)`
  margin-left: 10px;
`;

const Channel = styled.div``;
const ChannelName = styled.div`
  font-weight: 700;
`;
const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #606060;
`;
const ChannelInfo = styled.div`
  font-weight: 400;
  color: #606060;
  font-size: 13px;
  margin-top: 2px;
`;
const DeleteIcon = styled(DeleteOutlineIcon)`
  cursor: pointer;
`;

export default Chat;
