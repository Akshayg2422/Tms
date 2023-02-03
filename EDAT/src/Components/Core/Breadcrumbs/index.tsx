import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { BreadcrumbsProps, BreadCrumbItem } from './interfaces';
import { Button } from '@Components'
import { useSelector } from 'react-redux';

function Breadcrumbs({ defaultSelected, items, icons, link, onButtonClick, ...rest }: BreadcrumbsProps) {

  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  return (
    <div className='row'>
      <div className='col'>
        <Breadcrumb {...rest}>
          {icons &&
            <BreadcrumbItem>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className={`${icons}`} />
              </a>
            </BreadcrumbItem>
          }
          {
            items?.map((breadCrumbItem: BreadCrumbItem) => {
              const isSelected = defaultSelected?.id === breadCrumbItem.id
              return (
                <>
                  {isSelected ?
                    <BreadcrumbItem key={breadCrumbItem.id} className={'active'}>
                      {breadCrumbItem.title}
                    </BreadcrumbItem>
                    :
                    <BreadcrumbItem key={breadCrumbItem.id}>
                      <a href={link || '/'} >
                        {breadCrumbItem.title}
                      </a>
                    </BreadcrumbItem>
                  }
                </>
              )
            })

          }

        </Breadcrumb >
      </div>
      {dashboardDetails?.user_details?.is_faculty && (
        <div className='text-right mr-4' >
          <Button
            size={'sm'}
            text={'Assign Course'}
            onClick={onButtonClick}
          />
        </div>
      )}
    </div>
  )
}
export { Breadcrumbs };
