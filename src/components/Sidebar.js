import React from "react";
import styled from "styled-components";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import { sidebarItems } from "../data/SidebarData";
import { useState } from "react";
import ModalComponent from "./ModalComponent";

import { useHistory } from "react-router";
const Sidebar = ({ rooms, addChannel, showSidebar, user }) => {
   const history = useHistory();
   const [showModal, setShowModal] = useState(false);
   const [isSidebar, setIsSidebar] = useState(false);
   const goToChannel = (id) => {
      console.log(id);
      if (id) {
         history.push(`/room/${id}`);
      }
   };

   return (
      <Container
         className={
            showSidebar
               ? "animationSidebarShow"
               : "animationSidebarHide"
         }
      >
         <WorkspaceContainer>
            <Name>{user.name}</Name>
            <NewMessage>
               <AddCircleOutline />
            </NewMessage>
         </WorkspaceContainer>
         <MainChannels>
            {sidebarItems.map((item) => {
               return (
                  <MainChannelItem>
                     {item.icon}
                     {item.text}
                  </MainChannelItem>
               );
            })}
         </MainChannels>

         <ChannelsContainer>
            <NewChannelContainer>
               <div>Channels</div>
               <AddIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
               />
               <ModalComponent
                  addChannel={addChannel}
                  setIsOpen={setShowModal}
                  isOpen={showModal}
               />
            </NewChannelContainer>
            <ChannelList>
               {rooms.map((item) => {
                  return (
                     <Channel onClick={() => goToChannel(item.id)}>
                        # {item.name}
                     </Channel>
                  );
               })}
            </ChannelList>
         </ChannelsContainer>
      </Container>
   );
};

const Container = styled.div`
   background: #3f0e40;
   width: 260px;
   height: 100%;
   min-height: calc(100vh - 35px);
   min-width: 210px;
   position: relative;
`;
const WorkspaceContainer = styled.div`
   color: white;
   height: 64px;
   display: flex;
   align-items: center;
   position: relative;
   justify-content: space-between;
   padding-left: 15px;
   border-bottom: 1px solid #532753;
`;
const Name = styled.div``;

const NewMessage = styled.div`
   height: 36px;
   width: 36px;
   color: #3f0e40;
   fill: #3f0e40;
   background: white;
   display: flex;
   justify-content: center;
   border-radius: 50%;
   align-items: center;
   margin-right: 15px;
   cursor: pointer;
`;

const MainChannels = styled.div`
   padding-top: 20px;
`;
const MainChannelItem = styled.div`
   color: rgb(188, 171, 188);
   display: grid;
   grid-template-columns: 15% auto;
   height: 28px;
   align-items: center;
   padding-left: 15px;
   cursor: pointer;
   :hover {
      background-color: #350d36;
   }
`;
const ChannelsContainer = styled.div`
   color: rgb(188, 171, 188);
   margin-top: 10px;
`;

const NewChannelContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 28px;
   padding-left: 15px;
   padding-right: 12px;
`;

const ChannelList = styled.div``;
const Channel = styled.div`
   height: 28px;
   display: flex;
   align-items: center;
   padding-left: 15px;
   cursor: pointer;

   :hover {
      background-color: #350d36;
   }
`;

export default Sidebar;
