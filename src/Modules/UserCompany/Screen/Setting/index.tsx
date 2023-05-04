
import { BrandSector, Department, Designation, Tag, TaskGroup } from '@Modules'

function Setting() {
  return (
    <div className='m-3'>

      <div className='row'>
        <div className='col'>
          <Tag />
        </div>
        <div className='col-6 ml--3'>
          <BrandSector/>
        </div>
      </div>
      <div className='row mt--3'>
        <div className='col'>
          <Designation />
        </div>
        <div className='col-6 ml--3'>
          <Department />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <TaskGroup />
        </div>
        <div className='col-6 ml--3'>
        </div>
      </div>
    </div>
  )
}

export { Setting }