import React from "react";
import {TicketChat,AddChatTicket  } from "@Modules";
import { Card } from '@Components'

function Chats() {
  return (
    <Card>
      <TicketChat/>
      <AddChatTicket/>
    </Card>
  );
}

export { Chats };