import { icons, image } from '@Assets'
import { Button, Card, Image } from '@Components'
import { translate } from '@I18n'
import React from 'react'
import { Icons } from 'react-toastify'

function  PaymentCards() {
  return (
    <div className='d-flex justify-content-center pt-5 overflow-auto overflow-hide' style={{backgroundColor:'#ecefff',overflowY:'hidden'}}>
      <div className='container'>
        <div className={' row d-flex justify-content-center  align-item-center'}>
        <i className="bi bi-collection-play-fill mr-3 text-primary" style={{fontSize:'27px'}}></i>
        <h2 className="display-4 ">
        Subscription Tiers
              </h2>
        </div>
        <div className={'row pt-4'}>
          <div className={'col-lg-3 col-md-6'}>
            <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px'}}>

              <div className="bg-transparent">
                <h3 className="text-uppercase ls-1 text-black mb-0">
                  Silver pack
                </h3>
              </div>
              <hr className='horizontal dark mx--4' />
              <div className="">
                <div className="display-4 text-black ">₹499</div>
                <div className='pt-3'>
                  <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Silver&amount=499'
                    className='bg-primary border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
                </div>
                <ul className="list-unstyled my-4">
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Documentation
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-1 text-sm text-black">
                          Max Ticket Raised upto 1000
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Add Member upto 250
                        </span>
                      </div>
                    </div>

                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Support
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Expiry = 30days
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </Card>
          </div>

          <div className={'col-lg-3 col-md-6'}>
            <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>
              <div className="bg-transparent">
                {/* <Image src={icons.goldPack} height={35} width={35}/> */}
                <h3 className="text-uppercase ls-1 text-black mb-0">
                  Gold Pack
                </h3>
              </div>
              <hr className='horizontal light mx--4' />
              <div className="">
                <div className="display-4 text-black">₹999</div>
                <div className='pt-3'>
                  <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Gold&amount=999'
                    className=' bg-primary border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
                </div>
                <ul className="list-unstyled my-4">
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Documentation
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-1 text-sm text-black">
                          Max Ticket Raised upto 3000
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Add Member upto 500
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Support
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Expiry = 30days
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </Card>
          </div>

          <div className={'col-lg-3 col-md-6'}>
            <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>
              <div className="bg-transparent">
                <h3 className="text-uppercase ls-1 text-black mb-0">
                  Platinum Pack
                </h3>
              </div>
              <hr className='horizontal light mx--4' />
              <div className="">
                <div className="display-4 text-black">₹1499</div>
                <div className='pt-3'>
                  <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Platinum&amount=1499'
                    className=' bg-primary border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
                </div>
                <ul className="list-unstyled my-4">
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Documentation
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-1 text-sm text-black">
                          Max Ticket Raised upto 7000
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Add Member upto 750
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Support
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Expiry = 30days
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>
            </Card>
          </div>

          <div className={'col-lg-3 col-md-6'}>
            <Card className="card-pricing bg-white border-0 text-center mb-4" style={{ height: '550px' }}>

              <div className="bg-transparent">
                <h3 className="text-uppercase ls-1 text-black  mb-0">
                  Diamond Pack
                </h3>
              </div>
              <hr className='horizontal light mx--4' />
              <div className="">

                <div className="display-4 text-black">₹1999</div>
                <div className='pt-3'>
                  <a href='https://tmsprimary.quantaedat.com/authentication/payment/?name=Diamond&amount=1999'
                    className='bg-primary border-0 col btn btn-primary ' style={{ borderRadius: '20px' }}>{translate('auth.Buy Now')}</a>
                </div>
                <ul className="list-unstyled my-4">
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Documentation
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Max Ticket Raised upto UL
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-1 text-sm text-black">
                          Add Member upto Unlimited
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Support
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center">
                      <div>
                        <div className="icon-md">
                          <i className="fas fa-check text-primary text-md"></i>
                        </div>
                      </div>
                      <div>
                        <span className="pl-2 text-sm text-black">
                          Expiry = 30days
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>

            </Card>
          </div>
        </div>

      </div>

    </div>
  )
}
export { PaymentCards }
