/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { CompanyItemProps } from './interfaces'
import { Image, } from '@Components'
import { getPhoto } from '@Utils'
import { companySelectedDetails } from "@Redux";
import { HOME_PATH } from "@Routes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@Hooks";

import {
  Badge,
  Media
} from "reactstrap";



function CompanyItem({ item }: CompanyItemProps) {

  const { display_name, attachment_logo, address, phone, email } = item

  const dispatch = useDispatch();
  const { goTo } = useNavigation();


  const handleOnClick = (item: any) => {
    goTo(HOME_PATH.DASHBOARD + HOME_PATH.COMPANY_INFO);
    dispatch(companySelectedDetails(item));
  };

  return (
    <>


      <tbody className="" onClick={(item) => { handleOnClick(item)}}>
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <span className="name  mb-0 text-sm">
                  {display_name}
                </span>
              </Media>

            </Media>
          </th>
          <td>
            <Media className="justify-content-center align-items-center">
              <a
                className=" mr-3"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >

                <Image
                  src={getPhoto(attachment_logo)}
                  variant={'rounded'}
                  size={"lg"}
                />
              </a>
            </Media>
          </td>

          <td>
            <div className="d-flex align-items-center">
              <span>{phone}</span>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <span> {email}</span>
            </div>
          </td>
          <td className="budget">
            <div>
              <span>  {address} </span>
            </div>

          </td>
        </tr>
      </tbody>

    </>

  )
}

export { CompanyItem }