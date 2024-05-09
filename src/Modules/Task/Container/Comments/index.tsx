import React from "react";
import { TaskChat, AddChat } from "@Modules";
import { Card } from '@Components'
import { useWindowDimensions } from "@Hooks";


function Comments() {
  const { height } = useWindowDimensions()
  return (
    <div className="h-100">
      <Card style={{
        height: height - 75
      }}>
        <TaskChat />
        <AddChat />
      </Card>
    </div>
  );
}

export { Comments };