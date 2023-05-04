import React from "react";
import { TaskChat, AddChat } from "@Modules";
import { Card } from '@Components'

function Comments() {
  return (
    <Card>
      <TaskChat />
      <AddChat />
    </Card>
  );
}

export { Comments };