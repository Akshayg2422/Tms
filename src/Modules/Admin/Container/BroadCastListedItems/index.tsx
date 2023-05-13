import { H, Image } from "@Components";
import { BroadCastItemsProps } from "./interfaces";
import { getPhoto, getDataAndTime, capitalizeFirstLetter } from "@Utils";
import { translate } from "@I18n";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function BroadCastListedItems({ item }: BroadCastItemsProps) {
  const { title, attachments, description, created_by, created_at } = item;

  return (
    <div className="row mx--5">
      <div className="col">
        <div className='row d-flex align-items-center m-0 mt--2 ml-2'>
          <div className={''}>
            <div className={'align-self-center'}>{<Image variant={'avatar'} src={getPhoto(created_by?.profile_image)} />}</div>
          </div>
          <div className='ml-2'>
            <H
              className="py-1 m-0 pointer mb-0"
              tag={'h4'}
              text={capitalizeFirstLetter(created_by?.name)}
            />
            <div className={'d-flex align-items-center  mt--3'}>
              <div className={'mb-0 text-xs text-muted '} >{created_by ? created_by.department : '-'}</div>
              <div className='p-1 text-muted'>{'/'}</div>
              <div className={'mb-0 text-xs text-muted'}>{created_by ? created_by.designation : '-'}</div>
            </div>
            <div className=" mb-0 text-muted text-xs mt--2">{getDataAndTime(created_at)}</div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12 col-sm-0 col-12 mt--2 ml-2">
            <div className={'text-xs font-weight-800 mt--2 mb-1'}>{title}</div>
            <div className={'text-xs font-weight-400 mb--2'}>{description}</div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-0 col-12 mt-3 mb--6">
            <Carousel>
              {attachments &&
                attachments.length > 0 &&
                attachments?.map((attachment_logo: any, index: number) => {
                  return (
                    <Image
                      variant={"default"}
                      src={getPhoto(attachment_logo.attachment_file)}
                      height={'100%'}
                      width={'100%'}
                    />
                  );
                })}
            </Carousel>
          </div>

        </div>

      </div>
    </div>
  );
}

export { BroadCastListedItems };
