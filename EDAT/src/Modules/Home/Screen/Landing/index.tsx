import { HeaderNavbar, Question, Procedure, CodeEditor, FlowDiagramHeader } from '@Modules'
import { useRef } from 'react';

function Landing() {
  const questionRef = useRef<HTMLDivElement>(null)
  const procedureRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const flowDiagramRef = useRef<HTMLDivElement>(null)


  const navHeader = [
    {
      headerTitle: "Questions",
      headerRef: questionRef,
      headerID: "questions",
      href: "Questions",
      isCompleted:true
    },
    {
      headerTitle: "Procedure",
      headerRef: procedureRef,
      headerID: "procedure",
      href: "Procedure",
      isCompleted:true
    },
    {
      headerTitle: "FlowDiagram",
      headerRef: flowDiagramRef,
      headerID: "flowDiagram",
      href: 'FlowDiagram',
      isCompleted:true
    },

    {
      headerTitle: "Code",
      headerRef: codeRef,
      headerID: "code",
      href: 'Code',
      isCompleted:true
    },
  ];

  return (
    <div >
      <HeaderNavbar navHeader={navHeader} />

      {navHeader.map((it, index) => {
        return (
          <>
            {it.isCompleted && it.headerTitle === "Questions" &&
              <div ref={questionRef} className='mt-6'>
                <Question />
              </div>}

            {it.isCompleted && it.headerTitle === "Procedure" &&
              <div ref={procedureRef}>
                <Procedure />
              </div>}

              {it.isCompleted && it.headerTitle === "FlowDiagram" &&
              <div ref={flowDiagramRef}>
                <FlowDiagramHeader />
              </div>}

            {it.isCompleted && it.headerTitle === "Code" &&
              <div ref={codeRef}>
                <CodeEditor />
              </div>}
          </>
        )
      })}



    </div>
  )
}

export { Landing }