
import { BrandSector, Department, Designation, GroupTask, Tag } from '@Modules'

function Setting() {
  return (
    <div className='m-3'>
    
       <div className='row ml-2 mr-2 mt-3'>
        <div className='col-sm-6'>
          <div>
            <Department />
          </div>
          <div>
            <BrandSector />
          </div>
          <div>
            <GroupTask />
          </div>
        </div>
        <div className='col-sm-6'>
          <div>
            <Designation />
          </div>

          <div> 
       <Tag /> 
      </div>
        </div>

      </div> 
    </div>
  )
}

export { Setting }