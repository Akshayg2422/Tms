import React from 'react'
import { image } from '@Assets';
import { Input, Card, Image, Divider, Badge, Heading, Paragraph, Button, Title } from '@Components';
import { translate } from "@I18n";
import {useNavigation} from '@Hooks'
function Footer() {

  const {goTo} = useNavigation();
  return (
    <div className='container-fluid'>
      <div className={'pt-sm-7 pb-lg-5 pt-sm-0  pt-4 text-center mb-5'}>
        <p className='display-2 text-default'> {translate('gate.ninethScreen.delightfullySimpleAndPowerfulPosApplication')}  </p>
      </div>
       <div className=' pb-5 gradient'>
        <div className={'text-center z-index'}>
          <Image
            src={
              'https://framerusercontent.com/images/m2q6NYYmXTekjGhHtFPKzO8q1Xc.png?scale-down-to=2048'
            }
            alt={'group icon'}
            width={'80%'}
          />
          <div className={'row'}>
            <Image
              src={
                'https://framerusercontent.com/images/O1KbowTKivLKjFvBd8bJQLUE9VU.png'
              }
              alt={'gallery-icon'}
              width={'35%'}
              height={'10%'}
              className={'pl-6 pr-9'}
            />

            <Image
              src={
                'https://framerusercontent.com/images/0ECMOTJrwnaSR1sE7ZtSG1qxDo.png'
              }
              alt={'gallery-icon'}
              width={'35%'}
              height={'10%'}
              className={'pl-9 pr-8 pt-5'}
            />

            <Image
              src={
                'https://framerusercontent.com/images/oTzZJH40491qCFebiIcn3sdjZ40.png'
              }
              alt={'paint icon'}
              width={'30%'}
              height={'10%'}
              className={'pl-9 '}
            />
          </div>
        </div>
      </div> 
      <div className={'text-center pt-5 mt--5'}>
        <div className={'pt-sm-2  text-default rrr'}> {translate('gate.ninethScreen.readyToUseQuantaGate?')} </div>
        <p className={'  mt-lg-0 mt-sm-0 mt-3 mutedtitle text-default'}>
          {translate('gate.ninethScreen.subText')}
        </p>
      </div>



      <div className={'text-center'}>
        <Image
          src={
            'https://framerusercontent.com/images/ksLcmTWeXB6SPXETK7ARAMMdg.png'
          }
          alt={'group icon'}
          width={'250px'}
        />
      </div>
      <div className={'text-center'}>
        <Button
          text={translate('gate.ninethScreen.getStarted')}
          size={'lg'}
          className={'bg-primary text-white border-0 px-3 py-3 mt-4'}
        />
      </div>
      <div className={'text-right d-none d-lg-block d-print-block'}>
        <Image
          src={
            'https://framerusercontent.com/images/VmKu8NUTEeURnzzBVMIy99WusFI.png'
          }
          alt={'like'}
          width={'10%'}
        />
      </div>
      <div className={'row m-0'}>
        <span className='col-sm-3 d-none d-lg-block d-print-block'>
          <Image
            src={
              'https://framerusercontent.com/images/k2KuDOsi25tEQIVolkp0obxf8U4.png'
            }
            alt={'defaultGallery icon'}
            width={'60%'}
          />
        </span>

        <span className={'text-center d-none  d-lg-block col-sm-4'}>
          <Image
            src={
              'https://framerusercontent.com/images/zBv8FLxWT91sj5ZJYcocQkJ0GJs.png'
            }
            alt={'smiley'}
            width={'40%'}
          />
        </span>
        <span className={'text-right col-sm-4 pl-5 d-none d-lg-block d-print-block'}>
          <Image
            src={
              'https://framerusercontent.com/images/4Mb9lhQ88PBj0py2C06Q3tXFhw.png'
            }
            alt={'comb'}
            width={'60%'}
          />
        </span>
      </div>

      <div className='pt-5 pb-3'>
        <Divider space={'0'} />

        <div className='row m-0'>
          <div className='col-sm-3 pl-4 pl-sm-0 pl-lg-6 pt-5  '>
            <th className={'pb-4 text-default'}>{translate('gate.product')}</th>
            <p className={'text text-default pb-2'}>{translate('gate.fourthScreen.features')}</p>
            <p className={'text text-default pb-2'}>{translate('gate.pricing')}</p>
            <p className={'text text-default pb-2'}>{translate('gate.download')}</p>
            <div className='d-block d-lg-none'>
              <Divider space={'0'} />
            </div>
          </div>

          <div className='verticalLine d-none d-lg-block d-print-block'></div>

          <div className='col-sm-2 pt-sm-5 pl-4 pl-sm-0 pl-lg-2'>
            <th className={' text-default pb-4'}>{translate('gate.company')}</th>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.about')}</p>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.blog')}</p>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.contact')}</p>
            <div className='d-block d-lg-none'>
              <Divider space={'0'} />
            </div>
          </div>

          <div className='verticalLine d-none d-lg-block d-print-block'></div>

          <div className='col-sm-2 pt-sm-5 pl-4 pl-sm-0 pl-lg-2'>
            <th className={'pb-4 text-default'}>{translate('gate.community')}</th>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.help')}</p>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.discord')}</p>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.twitter')}</p>
            <p className={'text text-default pb-2  d-lg-block d-print-block'}>{translate('gate.linkedin')}</p>
            <div className='d-block d-lg-none'>
              <Divider space={'0'} />
            </div>
          </div>


          <div className='verticalLine d-none d-lg-block d-print-block'></div>

          <div className='col-sm-3 pt-5 pb-5 pl-sm-0 pl-5 pl-lg-2 '>
            <div className='row '>
              <Image
                src={image.QuantaGataLogo}
                alt='nav-icon'
                width={'50px'}
                height={'50px'}
                className={'mb-4'}
              />
              <h1 className={'mt-lg-2 pl-lg-3 pt-lg-1 p-sm-0 p-3 text-default h3 d-lg-block d-print-block'}>{translate('gate.quantaGate')}</h1>
              <p className='text-default'> {translate('gate.footerContent')} </p>
            </div>
          </div>
        </div>
        <div className='Divider'>
          <Divider space={'0'} />
        </div>
      </div>
      <footer className={'row m-0'}>
        <p className=' col-sm-6 small pl-lg-3 pl-sm-0 pl-8 text-default'> {translate('gate.copyrightcontent')} </p>
        <p style={{cursor : 'pointer'}} onClick={()=>{goTo('/Privacypolicy')}} className='col-sm-6 small text-default text-lg-right mr-sm-0  text-sm-center pl-sm-0 pl-8  pr-lg-7 '>{translate('gate.privacy')}</p>
      </footer>
    </div>
  )
}

export { Footer }