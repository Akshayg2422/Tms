import { Images } from "@Assets"
import { Button, Card, Divider, Image, InputWithImage, NoRecordsFound } from "@Components"
import moment from "moment"
import { useState } from "react"
import { ListGroup, ListGroupItem } from "reactstrap"
import { userOnlineStatusProps } from "./interface"

const UserOnlineStatus = ({ onNameClick, onClick, data, onImageClick, isViewClick = false, onChange, onSearchClick }: userOnlineStatusProps) => {
  const [isAddClick, setIsAddClick] = useState(isViewClick)

  let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
  var fiveMinutesAgoStatus = moment(currentTime).subtract(1, 'minutes').format("YYYY-MM-DD HH:mm:ss");

  const activeStatus = (value) => {
    if (fiveMinutesAgoStatus < value) {
      return true
    }
    else {
      return false
    }

  }
  return (
    <div className="">
      <Card>
        <div className="row" style={{ height: !isAddClick ? '5.5%' : '' }}>
          <div className="col">
            <h3>{'Users'}</h3>
          </div>
          <div className="text-right pr-3">
            <Button text={isAddClick ? 'Hide' : 'View'} size={'sm'} onClick={() => {
              if (onClick) {
                setIsAddClick(!isAddClick)
                onClick(isAddClick)
              }
            }}
            />
          </div>
        </div>

        {isAddClick && <div className="mt-3 overflow-auto scroll-hidden" style={{ height: isAddClick ? '77.6vh' : '0vh' }}>
          <InputWithImage image="search" placeholder={'Search'} onChange={(text: string) => {
            if (onChange)
              onChange(text)
          }} onClick={onSearchClick} />
          {data && data.length > 0 ?
            data.map((item: any) => {
              // console.log("5555555555555555555==>0",item);
              
              const { name = 'Alex', status = 'Online' } = item
              return (<ListGroup className="list my--3" flush>
                <ListGroupItem className="px-0">
                  <div className="row align-items-center">
                    <div className="col col-auto">
                      <a
                        className="avatar rounded-circle"
                        href="#pablo"
                        onClick={onImageClick}
                      >
                        <Image
                          alt="..."
                          size={'md'}
                          variant={'rounded'}
                          src={item?.photo ? item.photo : Images.rainForest}
                        />
                      </a>
                    </div>
                    <div className="col ml--2">
                      <h4 className="mb-0">
                        <a href="#pablo" onClick={onNameClick}>
                          {name}
                        </a>
                      </h4>
                      <span className={`text-${activeStatus(item.last_active_time) ? 'success' : 'muted'} mr-1`}>●</span>
                      <small>{activeStatus(item.last_active_time) ? 'Online' : 'Offline'}</small>
                    </div>
                  </div>
                  <Divider space="2" />
                </ListGroupItem>
              </ListGroup>
              )
            }) :
            <div className=" d-flex justify-content-center align-items-center mt--5" style={{
              height: '77.6vh'
            }}>

              <NoRecordsFound />
            </div>
          }
        </div>}

      </Card>
    </div>
  )
}

export { UserOnlineStatus }

