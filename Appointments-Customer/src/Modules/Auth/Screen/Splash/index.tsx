import React from 'react';
import { Image, Heading } from '@Components';
import { icons } from '@Assets';
import { translate } from '@I18n';

function Splash() {
  return (
    <div className={'container-fluid d-flex h-100vh justify-content-center align-items-center'}>
      <div className={'text-center'}>
        <Image
          src={icons.logo}
          alt={'quanta logo'}
          width={120}
          height={120}
        />
        <Heading variant='h3' heading={translate('common.business')} />
        <Heading variant='h1' heading={translate('common.businessAppName')} />
      </div>
    </div>
  );
}

export { Splash };
