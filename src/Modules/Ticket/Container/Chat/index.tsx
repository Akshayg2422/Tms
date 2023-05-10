import React from "react";
import {TicketChat,AddChatTicket  } from "@Modules";
import { Card } from '@Components'

function Chat() {
  return (
    <Card>
      <TicketChat/>
      <AddChatTicket/>
    </Card>
  );
}

export { Chat };