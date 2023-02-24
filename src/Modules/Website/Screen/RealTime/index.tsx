import { image } from '@Assets';
import { Card, Image } from '@Components';
import { translate } from "@I18n";
function RealTime() {
  return (
    <div className='container'>
    <Card className='mt-3  pt-5 pb-7 bg-secondary shadow-none'>
      <div className='row'>
      <div className='col-sm-6'>
          <div className='row justify-content-center pr-lg-0 pr-md-6 pt-md-5 pt-sm-0 pt-5'>
            <Image src={image.TMS_5} alt='image'
              width={'80%'} 
               />
          </div>
          <div className='pt-5 '> <a href="#">
            <i className={'bi bi-play-circle-fill text-primary pl-4 pl-sm-4  fa-4x'}></i> </a>
            <span className={'watchIcon mb-3 text-default sptag '}><b>{translate('TMS.WatchTutorial')}</b></span>
          </div>
        </div>

        <div className='col-sm-6 pl-sm-5 pt-5 '>
          <h1 className={'text-default col-lg-9 display-3 seventh-screen-heading col-sm-0 col-12'}> <b>{translate('TMS.seventhScreen.Heading')} </b></h1>
          <p className={'text-default h2 font-weight-normal col-lg-9 mt-4 col-sm-0 col-12'}><b> {translate('TMS.seventhScreen.subText')}</b>
          </p>
          
        </div>
        
      </div>

    </Card>
  </div>

  )
}

export { RealTime }