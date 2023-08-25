
import { AddEventChat, GetEventMessage } from "@Modules";
import { Back, Card } from '@Components'

function EventChatting() {
  return (
     <>
    <div className="h-100 m-3">
    <div className="">
        <Back/>
      </div>
      <Card>
        <GetEventMessage/>

        <div className={'mt-4'}>
        <AddEventChat />

        </div>
    
      </Card>
    </div>
    </>
  );
}

export { EventChatting };