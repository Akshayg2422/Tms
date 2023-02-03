import { image } from '@Assets';
import { Card, Image } from '@Components';
import { translate } from "@I18n";
function Rev() {
  return (
    <div className='container'>
    <Card className='mt-3  pt-5 pb-5 bg-secondary shadow-none'>
      <div className='row'>

        <div className='col-sm-7 pl-sm-5 pt-5 '>
          <h1 className={'text-default col-lg-9 display-3 seventh-screen-heading col-sm-0 col-12'}> {translate('gate.seventhScreen.Heading')} </h1>
          <p className={'text-default h2 font-weight-normal col-lg-8 mt-4 col-sm-0 col-12'}> {translate('gate.seventhScreen.subText')}
          </p>
          <div className='pt-5 '> <a href="#">
            <i className={'bi bi-play-circle-fill text-primary ml-sm-0 ml-3  fa-4x'}></i> </a>
            <span className={'watchIcon mb-3 text-default sptag pl-3'}><b>{translate('gate.WatchTutorial')}</b></span>
          </div>
        </div>
        <div className='col-sm-5'>
          <div className='row justify-content-center pr-lg-6 pr-md-6 pt-md-5 pt-sm-0 pt-5'>
            <Image src={image.Rev} alt='image'
              width={'100%'} height={'100%'}
               />
          </div>
        </div>
      </div>

    </Card>
  </div>

  )
}

export { Rev }