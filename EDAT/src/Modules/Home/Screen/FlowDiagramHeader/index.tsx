import { Button } from '@Components'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import React from 'react'

const FlowDiagramHeader = React.forwardRef((props, ref: any) => {
    const { goTo } = useNavigation()
    return (
        <>
            <div className=' container-fluid pb-7' id='FlowDiagram' ref={ref}>
            <div className='pt-6 pb-4 display-3 ' >FLOW DIAGRAM</div>
            <Button
            text={'Click to Draw'}
            className='mt--6 float-right'
            onClick={ ()=>{ goTo('/dashboard' + ROUTES.HOME.FLOWDIAGRAM, false)}}
            />
                <img src='https://www.ntaskmanager.com/wp-content/uploads/2020/02/flow-charting.png' alt='...'
                    width={'100%'}></img>

            </div>
        </>
    )
}
)

export { FlowDiagramHeader }