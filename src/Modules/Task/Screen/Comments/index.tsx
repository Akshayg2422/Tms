import React from "react";
import { TaskChat } from "@Modules";
import { Card } from '@Components'
import { useWindowDimensions } from '@Hooks'


function Comments() {

  const { height } = useWindowDimensions()
  return (
    <Card className="overflow-auto" style={{
      height: height - 60
    }}>
      <TaskChat />
    </Card>
  );
}

export { Comments };