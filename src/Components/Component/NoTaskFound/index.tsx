import { icons } from "@Assets";
import { Image } from "@Components";

type NotDataFoundProps = {
    text?: string
}

function NoTaskFound({ text = 'No Task Found' }: NotDataFoundProps) {
    return (
        <div className={'mt-7'}>
            <div>
                <Image
                    size={'sm'}
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover mb--3"
                    // src={icons.questionMark}
                    style={{
                        width: "140px",
                        height: "140px",
                        backgroundColor: '#D3D3D3',
                        position: 'relative'
                    }}
                />
                <img
                    src={icons.issuesProblem}
                    alt="..."
                    style={{
                        position: 'absolute',
                        top: '63%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '8%' // <-- Adjust the size of the icon here
                    }}
                />
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
