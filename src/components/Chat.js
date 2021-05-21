import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from "../firebase";
import firebase from "firebase";
import { useHistory, useLocation, useParams } from "react-router";
const Chat = ({ user, showSidebar }) => {
   const [channel, setChannel] = useState([]);
   const [messages, setMessages] = useState([]);
   let { channelId } = useParams();
   const history = useHistory();
   const [updateScroll, setUpdateScroll] = useState(1);
   const ref = useRef("");

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
            .add(payload)
            .then(() => {
               var objDiv = ref.current;
               objDiv.scrollTop = objDiv.scrollHeight;
            });
      }
   };

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

   const deleteChannel = async () => {
      await db
         .collection("rooms")
         .doc(channelId)
         .delete()
         .then(() => {
            history.push("/rooms");
         });
   };

   useEffect(() => {
      getMessages();
      getChannel();
      console.log(channelId);
   }, [channelId]);

   return (
      <Container
         className={
            showSidebar ? "animationChatEnter" : "animationChatLeave"
         }
      >
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

         <MessageContainer ref={ref}>
            {messages.length > 0 &&
               messages.map((data, index) => (
                  <ChatMessage
                     id={index}
                     key={index}
                     name={data.user}
                     image={data.userImage}
                     timestamp={data.timestamp}
                     text={data.text}
                     sendMessage={sendMessage}
                     updateScroll={updateScroll}
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
   width: 100%;
   height: 100%;
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
   height: 100%;
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
`;
const DeleteIcon = styled(DeleteOutlineIcon)`
   cursor: pointer;
`;

export default Chat;
