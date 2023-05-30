import React from "react";
import { TaskChat, AddChat } from "@Modules";
import { Card } from '@Components'

function Comments() {
  return (
    <div className="h-100">
      <Card>
        <TaskChat />
        <AddChat />
      </Card>
    </div>
  );
}

export { Comments };