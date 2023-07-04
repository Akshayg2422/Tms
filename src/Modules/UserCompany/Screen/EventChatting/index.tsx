import React from "react";
import { AddEventChat, GetEventChat } from "@Modules";
import { Back, Card } from '@Components'

function EventChatting() {
  return (
     <>
    

    <div className="h-100 m-3">
    <div className="">
        <Back/>
      </div>
      <Card>
        <GetEventChat />
        <AddEventChat />
      </Card>
    </div>
    </>
  );
}

export { EventChatting };