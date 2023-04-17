import { icons } from "@Assets";
import { Image } from "@Components";

type NotDataFoundProps = {
    text?: string;
    src?:any;
};

function NoTaskFound({ text = 'No Task Found' ,src}: NotDataFoundProps) {
    return (
        <div className={'mt-7'}>
            <div className=" d-flex justify-content-center text-center ">
            <div style={{ 
      height: 155, width: 155, borderRadius: 110,  background:'#D3D3D3' }}>
 
                {/* <Image
                    size={'sm'}
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover mb--3"
                    style={{
                        width: "140px",
                        height: "140px",
                        backgroundColor: '#D3D3D3',
                        position: 'relative'
                    }}
                /> */}
                <div className="mt-4">
                 <Image
            className={'border-none '}
            variant={'rounded'}
            src={src}
            size={'xxl'}
            alt="..."
            style={{
            //   position: 'absolute',
            //   top: '68%',
            //   left: '50%',
            //   transform: 'translate(-50%, -50%)',
              backgroundColor: '#D3D3D3'
            }}
          />
          </div>
   </div>

            </div>

            <div className="pt-4 text-center">
                <h5 className="h3 title">
                    <p className="d-block mb-1"><u>{text}</u></p>
                </h5>
            </div>
        </div>
    );
}

export { NoTaskFound }
