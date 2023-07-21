import { icons } from '@Assets';
import { Button, ImageIcon, Modal } from '@Components';
import { useModal } from '@Hooks';
import  { useEffect, useRef, useState } from 'react'
import { MicroPhoneProps} from './interfaces'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedModal} from '@Redux';


function MicroPhoneModal({selectedModal=false}:MicroPhoneProps) {
    const dispatch = useDispatch()
    const [stream,setStream]=useState<any>()
    const mediaRecorderRef=useRef<any>()
    const [recording, setRecording]=useState<any>()
    const [audioData,setAudioData]=useState()
    const { selectedMicroModal} = useSelector((state: any) => state.TaskReducer);
    const microPhoneModals=useModal(selectedMicroModal)

    useEffect(()=>{
        getMicrophonePermission()

    },[])


     const handleDataAvailable = (event: any) => {
        if (event.data.size > 0) {
          const audioBlob = new Blob([event.data], { type: 'audio/wav' });
          const reader: any = new FileReader();
          reader.onload = () => {
            const base64Audio = reader.result.split(',')[1];
            setAudioData(base64Audio)
          };
          reader.readAsDataURL(audioBlob);
        }
      };


    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
          try {
            const streamData = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            setStream(streamData);
          } catch (err) {
            alert(err);
          }
        } else {
          alert("The MediaRecorder API is not supported in your browser.");
        }
      };
    
      const startVoiceRecording = () => {
        if (stream) {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
          mediaRecorderRef.current.start();
          setRecording(true);
        }
      };
    
      const stopVoiceRecording = () => {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setRecording(false);
        }
      };
 
    
  return (
  
    <div>
         <Modal size={'md'} isOpen={microPhoneModals.visible} onClose={()=>{
           microPhoneModals.hide()
            dispatch(
                setSelectedModal(false)
            )
        }
           
            } title={'CreateRecorder'}
            >
  <div >
 { recording &&  <div className="row justify-content-center mb-4 mt--4">
    <ImageIcon src={icons.microPhone} width={25} height={25}/>

    </div>
}
  
    <div className={'row justify-content-between px-2'}>
       {recording!==true && <Button text={'Start'} onClick={()=>{startVoiceRecording()}} size="sm"/>}
       {recording && <Button text={'ReCapture'} onClick={()=>{
     
     startVoiceRecording()

    }} size={'sm'}/>}

       {recording && <Button text={'Stop'}onClick={()=>{stopVoiceRecording()}} size={'sm'}/>}
   
        </div>
        
        <div className={' pt-3'}>
     { recording &&  <Button text={'submit'} onClick={()=>{stopVoiceRecording()}} size={'sm'}/>}

        </div>

        </div>


</Modal>

    </div>
  )
  
}

export{ MicroPhoneModal}