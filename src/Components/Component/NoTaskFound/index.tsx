import { icons} from "@Assets";
import {  Image } from "@Components";
type NotDataFoundProps = {
    text?: string
}

function NoTaskFound({ text = 'No Task Found' }: NotDataFoundProps) {
    return (
        <div className=' d-flex justify-content-center  text-center '>
        <div style={{ 
            height: 150, width: 150, borderRadius: 70, margin: "50px", background:'#D3D3D3'
          }}>
            <div className="pt-5">
            <Image src={icons.addToFill} className="text-#5A5A5A " variant={'avatar'} size={'md'} />
            </div>
            <div className="text-muted text-center  mt-6">
               <ins>{text}</ins> 
            </div>
            </div>
                     </div>
    );
}

export { NoTaskFound }