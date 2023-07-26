import { icons } from '@Assets';
import { Button, ImageIcon, Modal } from '@Components';
import { useLoader, useModal } from '@Hooks';
import  { useEffect, useRef, useState } from 'react'
import { MicroPhoneProps} from './interfaces'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsingVoice, getSelectedReference, setSelectedModal, setSelectedTabPosition} from '@Redux';
import { ROUTES } from '@Routes';
import { useNavigation } from 'react-router';


function MicroPhoneModal({selectedModal=false}:MicroPhoneProps) {
    const dispatch = useDispatch()
    // const {goTo}=useNavigation()
    const [stream,setStream]=useState<any>()
    const mediaRecorderRef=useRef<any>()
    const [recording, setRecording]=useState<any>()
    const [isSelected,setSelected]=useState<any>(false)
    const [audioData,setAudioData]=useState()
    const { selectedMicroModal} = useSelector((state: any) => state.TaskReducer);
    const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
    console.log(JSON.stringify(dashboardDetails),"dashboardDetails ==>")
    const microPhoneModals=useModal(true)
    const loginLoader = useLoader(false);
    const [counting,setCounting]=useState(false)
    const [stopAudio,setStopAudio]=useState(true)

    useEffect(()=>{
        getMicrophonePermission()
      
    },[])
    
  useEffect(()=>{
    if(audioData){
    addVoiceUsingRecord()
    }

  },[audioData])

    const addVoiceUsingRecord =()=>{
    
      const params={
        code:dashboardDetails?.company_branch?.code,
        voice_task:audioData
        }
        loginLoader.show()
       
        dispatch(
          fetchUsingVoice({
            params,
            onSuccess:()=>()=>{
              loginLoader.hide()
              microPhoneModals.hide()
              setSelected(false)
              setCounting(false)

              // dispatch(getSelectedReference({ code: item?.code, refer: true }))
              // dispatch(setSelectedTabPosition({ id: '1' }))
              // goTo(ROUTES["task-module"]["tasks-details"] +'/' + item?.code + '/' + 'task');
              
            },
            onError:()=>()=>{
              microPhoneModals.hide()
              loginLoader.hide()
              setSelected(false)

            }
          })

        )
    }

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
         {/* <Modal size={'md'} isOpen={microPhoneModals.visible} onClose={()=>{
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
       {recording!==true && <Button text={'Start'} onClick={()=>{
        startVoiceRecording()
        setSelected(true)}} size="sm"/>}
       {recording && <Button text={'ReCapture'} onClick={()=>{
     
     startVoiceRecording()

    }} size={'sm'}/>}
      {counting && <div>Wait a few minutes... </div>} 
        

       {recording && <Button text={'Stop'}onClick={()=>{
        stopVoiceRecording()
        }} size={'sm'}/>}
   
        </div>
        
        
        <div className={' pt-3'}>
     { isSelected &&  <Button text={'submit'}
      loading={loginLoader.loader}
       onClick={()=>{

        setCounting(true)
      stopVoiceRecording()
    
      }} size={'sm'}/>
      }

        </div>

        </div>


</Modal> */}
         <Modal size={'md'} isOpen={microPhoneModals.visible} onClose={()=>{
           microPhoneModals.hide()
            dispatch(
                setSelectedModal(false)
            )
        }
           
            } title={'CreateRecorder'}
            >
              <div>

            
              
  <div className='d-flex justify-content-center'>


 {  <div className="row justify-content-center mb-4 mt--4">
    <ImageIcon src={icons.microPhone} width={25} height={25}/>

    </div>
}
  

        </div>

        <div className={'d-flex justify-content-center mb-1'}>
        {counting && <div>Wait a few minutes... </div>} 

        </div>

        <div className={'d-flex justify-content-center pt-2'}>
        {recording!==true && <Button text={'Start'} onClick={()=>{
        startVoiceRecording()
        setSelected(true)}} size="sm"/>}

{recording && <Button text={'ReCapture'} onClick={()=>{
     
     startVoiceRecording()

    }} size={'sm'}/>}


            { isSelected &&  
              <Button text={'submit'}
      loading={loginLoader.loader}
       onClick={()=>{

        setCounting(true)
      stopVoiceRecording()
      setStopAudio(true)
    
      }} size={'sm'}/>
    
      }

{recording && <Button text={'Stop'}onClick={()=>{
        stopVoiceRecording()
        setStopAudio(false)
        }} size={'sm'}/>}


        </div>

        </div>


</Modal>

    </div>
  )
  
}

export{ MicroPhoneModal}