
import { BrandSector, Department, Designation, GroupTask, Tag } from '@Modules'

function Setting() {
  return (
    <div className='m-3'>

      <div className='row'>
        <div className='col'>
          <Tag />
        </div>
        <div className='col'>
          <BrandSector />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Designation />
        </div>
        <div className='col'>
          <Department />
        </div>
      </div>




      {/* <div className='row ml-2 mr-2 mt-3'>
        <div className='col-sm-6'>
          <div>
           
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

          <div> */}
      {/* <Tag /> */}
      {/* </div>
        </div>

      </div> */}
    </div>
  )
}

export { Setting }