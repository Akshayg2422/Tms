import React from 'react'
import { TimeLineProps } from './interfaces'
import { Image } from '@Components'

function TimeLine({ showDotterLine, children, title, time, icon, color = 'info', rtl }: TimeLineProps) {
    return (
        <div
            className={`${showDotterLine && 'timeline'} timeline-one-side `}
            data-timeline-axis-style="dashed"
            data-timeline-content="axis">
            <div className="timeline-block" dir={rtl ? "rtl" : undefined}>
                <span className={`timeline-step badge-${color}`}>
                    {icon ? <Image src={icon} width={20} height={20} /> : <i className="ni ni-bell-55" />}
                </span>

                <div className="timeline-content">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <span className="text-muted text-sm font-weight-bold">
                                {title}
                            </span>
                        </div>
                        <div className="text-right">
                            <small className="text-muted">
                                <i className={`fas fa-clock mr-1 ${rtl && 'ml-1'}`} />
                                {time}
                            </small>
                        </div>
                    </div>
                    <div className='mb-4'>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { TimeLine }