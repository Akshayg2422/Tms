import { Button, Card } from '@Components'
import React from 'react'

function Cards() {
  return (
    <div className='d-flex justify-content-center pt-5'>
        <div className='container'>
        <div className={'row pt-5'}>
        <div className={'col-lg-3 col-md-6'}>
          <Card className="card-pricing bg-white border-0 text-center mb-4" style={{height:'550px'}}>
          <div className="bg-transparent">
            <h4 className="text-uppercase ls-1 text-black py-3 mb-0">
              Bravo pack
            </h4>
          </div>
          <hr></hr>
          <div className="">
            <div className="display-3 text-black">₹49</div>
            <span className="text-black">per application</span>
            <ul className="list-unstyled my-4">
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-terminal bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Complete documentation
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-pen-fancy bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Working materials in Sketch
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-hdd bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      2GB cloud storage
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <Button className=" mb-3" text={" By Know"}size={'md'} />
          </div>
          <div className="bg-transparent">
            <a
              className="text-black"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Request a demo
            </a>
          </div>
        </Card>
        </div>
        <div className={'col-lg-3 col-md-6'}>
          <Card className="card-pricing bg-white border-0 text-center mb-4" style={{height:'550px'}}>
          <div className="bg-transparent">
            <h4 className="text-uppercase ls-1 text-black py-3 mb-0">
              Bravo pack
            </h4>
          </div>
          <hr></hr>
          <div className="">
            <div className="display-3 text-black">₹49</div>
            <span className="text-black">per application</span>
            <ul className="list-unstyled my-4">
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-terminal bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Complete documentation
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-pen-fancy bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Working materials in Sketch
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-hdd bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      2GB cloud storage
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <Button className="mb-3 " text={" By Know"}size={'md'} />
          </div>
          <div className="bg-transparent">
            <a
              className="text-black"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Request a demo
            </a>
          </div>
        </Card>
        </div>
        <div className={'col-lg-3 col-md-6'}>
          <Card className="card-pricing bg-white border-0 text-center mb-4" style={{height:'550px'}}>
          <div className="bg-transparent">
            <h4 className="text-uppercase ls-1 text-black py-3 mb-0">
              Bravo pack
            </h4>
          </div>
          <hr></hr>
          <div className="">
            <div className="display-3 text-black">₹49</div>
            <span className="text-black">per application</span>
            <ul className="list-unstyled my-4">
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-terminal bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Complete documentation
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-pen-fancy bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Working materials in Sketch
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-hdd bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      2GB cloud storage
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <Button className="mb-3 " text={" By Know"}size={'md'} />
          </div>
          <div className="bg-transparent">
            <a
              className="text-black"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Request a demo
            </a>
          </div>
        </Card>
        </div>
        <div className={'col-lg-3 col-md-6'}>
          <Card className="card-pricing bg-white border-0 text-center mb-4" style={{height:'550px'}}>
          <div className="bg-transparent">
            <h4 className="text-uppercase ls-1 text-black py-3 mb-0">
              Bravo pack
            </h4>
          </div>
          <hr></hr>
          <div className="">
            <div className="display-3 text-black">₹49</div>
            <span className="text-black">per application</span>
            <ul className="list-unstyled my-4">
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-terminal bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Complete documentation
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-pen-fancy bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      Working materials in Sketch
                    </span>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex align-items-center">
                  <div>
                    <div className="icon icon-xs icon-shape bg-white shadow rounded-circle">
                      <i className="fas fa-hdd bg-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="pl-2 text-sm text-black">
                      2GB cloud storage
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <Button className=" mb-3" text={" By Know"}size={'md'} />
             
          </div>
          <div className="bg-transparent ">
            <a
              className="text-black"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              Request a demo
            </a>
          </div>
        </Card>
        </div>
        </div>

        </div>

    </div>
  )
}
export {Cards}
