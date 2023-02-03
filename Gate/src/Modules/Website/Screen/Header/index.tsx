import React from 'react'
import { Image ,Button} from '@Components';
import { image } from '@Assets';
import { translate } from "@I18n";
function Header() {
  return (
 
          <div className='fixed-top border-0 bg-secondary pt-3 pb-3'>
              <div className='row m-0'>
                <div className={'col-6'}>
                  <div className='ml-md-5 ml-lg--5  ml-sm-0 ml--3'>
                    <Image
                      src={image.QuantaGataLogo}
                      alt='nav-icon'
                      width={'50px'}
                      height={'50px'}
                      className='ml-sm-0 ml-4 ml-lg-6'
                    />
                  </div>
                </div>
                <div className={'col-6'}>
                  <div className='row justify-content-end m-0'>
                    <form className='mr-md-5 pr-sm-0 pr-2'>
                      <Button
                        text={translate('common.signIn')}
                        size={'md'}
                        outline
                        color={'default'}
                        className={' bg-primary border-0 px-4 py-3  text-white shadow-none  '}
                      />

                    </form>
                  </div>
                </div>

              </div>
            </div>
          
   
  )
}

export { Header }