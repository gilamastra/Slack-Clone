import React from "react";
import styled from "styled-components";
import * as dateFns from "date-fns";

const ChatMessage = ({ name, text, image, timestamp }) => {
   var helperDate = dateFns.addSeconds(
      new Date(0),
      timestamp.seconds
   );

   return (
      <Container>
         <UserAvatar>
            <img src={image} alt="" />
            <MessageContent>
               <Name>
                  {name}
                  <span>{dateFns.format(helperDate, "h:mm: a")}</span>
               </Name>
               <Text>{text}</Text>
            </MessageContent>
         </UserAvatar>
      </Container>
   );
};

export default ChatMessage;

const Container = styled.div`
   padding: 11px 20px;
   display: flex;
   align-items: center;
   @media screen and (max-width: 768px) {
      padding: 0;
      width: 100%;
      margin-left: 15px;
      margin-top: 8px;
   }
`;

const UserAvatar = styled.div`
   position: relative;
   display: flex;
   border-radius: 2px;
   img {
      width: 36px;
      height: 36px;
      margin-right: 8px;
   }
`;

const MessageContent = styled.div`
   flex-direction: column;
   span {
      width: auto;
   }
`;

const Name = styled.span`
   font-weight: 900;
   font-size: 15px;
   line-height: 1;
   margin-right: 8px;
   display: flex;
   @media screen and (max-width: 768px) {
      justify-content: space-between;
      font-size: 12px;
   }
   span {
      margin-left: 8px;
      display: block;
      font-weight: 400;
      color: rgb(97, 96, 97);
      font-size: 13px;
   }
`;
const Text = styled.span`
   word-break: break-word;
`;
