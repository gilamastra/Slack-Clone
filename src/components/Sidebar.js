import React from "react";
import styled from "styled-components";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import {
  sideBarChannelsItems,
  sidebarItems,
} from "../data/SidebarData";
import db from "../firebase";
import { useHistory } from "react-router-dom";

const Sidebar = ({ rooms }) => {
  const history = useHistory();

  const goToChannel = (id) => {
    console.log(id);
    if (id) {
      history.push(`/room/${id}`);
    }
  };
  const addChannel = () => {
    const promptName = prompt("Enter channel name");
    if (promptName) {
      db.collection("rooms").add({
        name: promptName,
      });
    }
  };
  return (
    <Container>
      <WorkspaceContainer>
        <Name>Clever</Name>
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
          <AddIcon onClick={addChannel} />
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
`;
const WorkspaceContainer = styled.div`
  color: white;
  height: 64px;
  display: flex;
  align-items: center;
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
