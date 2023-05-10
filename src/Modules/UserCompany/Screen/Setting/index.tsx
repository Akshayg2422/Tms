
import { BrandSector, Department, Designation, Tag, TaskGroup } from '@Modules'

function Setting() {
  return (
    <div className='m-3'>
      <div className='row'>
        <div className='col-6'>
      <Tag />
   <div className='mt--3'><Designation /></div>   
      <TaskGroup />

        </div>
        <div className='col-6 ml--2'>
        <BrandSector/>
        <Department />

        </div>

      </div>

    </div>
  )
}

export { Setting }