import React from 'react'
import { image } from '@Assets';
import { Card, Image } from '@Components';
import { translate } from "@I18n";
function Experiences() {
  return (
    <div className={'mt-lg-5 mt-5 pt-7  pb-7 mt-sm-0 bg-secondary'}>
      <h1 className={'text-center text-default display-2 people pl-sm-6'}><b> {translate('TMS.eighthScreen.Experiences and Feedback')} </b></h1>
      {/* <p className={'text-center text-default h2 font-weight-normal people-subtext mb-lg-5 pl-sm-6  mb-5 mb-md-6 mb-sm-0 mt--2'}> <b>{translate('TMS.eighthScreen.subText')}</b> </p> */}
      <div className={'container'}>
        <div className={'row pt-5'}>
          <div className={' col-lg-4 col-md-6 '}>
            <Card className=' card-size' style={{height:'90%'}}>
              <div className='mx-sm-3'>
                <Image size={'xl'} variant={'rounded'} className={'mt-4 mb-3'} src={'https://framerusercontent.com/images/ra7FjyyA6dq6lUSJdUPaGegjtg.png'} />
                <p className={'text-default card-text'} ><b>{translate('TMS.eighthScreen.cardText1')}</b></p>
              </div>
            </Card>
          </div>
          <div className={'col-lg-4 col-md-6'}>
            <Card className=' card-size' style={{height:'90%'}}>
              <div className='mx-sm-3'>
                <Image size={'xl'} variant={'rounded'} className={'mt-4 mb-3'} src={'https://framerusercontent.com/images/PuwCiG06NCpMWqOdJdutXpqSck.png'} />
                <p className={'text-default  card-text'}><b>
                  {translate('TMS.eighthScreen.cardText2')}
                </b></p>
              </div>
            </Card>
          </div>
          <div className={'col-lg-4 col-md-6'}>
            <Card className=' pb-4 card-size'style={{height:'90%'}}>
              <div className='mx-sm-3'>
                <Image size={'xl'} variant={'rounded'} className={'mt-4 mb-3'} src={'https://framerusercontent.com/images/vrVhX85jGmxNrhqkDXgF4LmhZ38.png'} />
                <p className={'text-default card-text'}><b>  {translate('TMS.eighthScreen.cardText3')}</b> </p>
              </div>
            </Card>
          </div>
          <div className={'col-lg-4 col-md-6'}>
            <Card className=' pb-4 card-size'style={{height:'90%'}}>
              <div className='mx-sm-3'>
                <Image size={'xl'} variant={'rounded'} className={'mt-4 mb-3'} src={'https://framerusercontent.com/images/IdfQJdzpL9gdVhtuRYdzi3uMJA.png'} />
                <p className={'text-default  card-text'}><b> {translate('TMS.eighthScreen.cardText4')} </b> </p>
              </div>
            </Card>
          </div>
          <div className={'col-lg-4 col-md-6'}>
            <Card className=' pb-4 card-size'style={{height:'90%'}}>
              <div className='mx-sm-3'>
                <Image size={'xl'} variant={'rounded'} className={'mt-4 mb-3'} src={'https://framerusercontent.com/images/oLQaVmCYYqGTs9N7AhxJzQpUuBI.png'} />
                <p className={'text-default card-text'}><b>  {translate('TMS.eighthScreen.cardText5')}</b></p>
              </div>
            </Card>
          </div>
          <div className={'col-lg-4 col-md-6'}>
            <Card className='pb-4 card-size'style={{height:'90%'}}>
              <div className='mx-sm-3'>
                <Image size={'xl'} variant={'rounded'} className={'mt-4 mb-3'} src={'https://framerusercontent.com/images/JiwtK6Ew8Z9m6HTHUySJiUKv80.png'} />
                <p className={'text-default card-text '}><b> {translate('TMS.eighthScreen.cardText6')} </b></p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>

  )
}

export { Experiences }