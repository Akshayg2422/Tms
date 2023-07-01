import React from "react";
import { AddEventChat, GetEventChat } from "@Modules";
import { Card } from '@Components'

function EventChatting() {
  return (
    <div className="h-100 m-3">
      <Card>
        <GetEventChat />
        <AddEventChat />
      </Card>
    </div>
  );
}

export { EventChatting };