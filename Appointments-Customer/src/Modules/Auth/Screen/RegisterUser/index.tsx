import React from 'react';
import { Card, Input, DropDown, Button } from '@Components';
import { Form, FormGroup } from 'reactstrap';
import { translate } from '@I18n';

function RegisterUser() {
  return (
    <div>
      <div className='container'>
        <div className=' row pt-5'>
          <div className='col-sm-2 '></div>
          <div className='col-sm-8 '>
            <Card>
              <div className=' row pt-2'>
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                  <Form>
                    <Input
                      id={'FirstName'}
                      heading={translate('auth.firstName')}
                      type={'text'}
                    />
                    <Input
                      id={'LastName'}
                      heading={translate('auth.lastName')}
                      type={'text'}
                    />
                    <Input
                      id={'ContactNumber'}
                      heading={translate('auth.contactNumber')}
                      type={'number'}
                      placeholder={translate('auth.prefilled With Login Mobile Number')!}
                    />
                    <DropDown
                      heading={translate('auth.gender')}
                      data={[
                        { id: '1', text: 'Male', other: 'M' },
                        { id: '2', text: 'FeMale', other: 'F' },
                        { id: '3', text: 'Other', other: ')' },
                      ]}
                    />
                    <DropDown
                      heading={translate('auth.designation')}
                      data={[
                        { id: '1', text: 'Male', other: 'M' },
                        { id: '2', text: 'FeMale', other: 'F' },
                        { id: '3', text: 'Other', other: ')' },
                      ]}
                    />
                    <div className='text-center'>
                      <Button
                        text={translate('common.submit')}
                        size={'md'}
                        color={'warning'}
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </Card>
          </div>
          <div className='col-sm-3'></div>
        </div>
      </div>
    </div>
  );
}

export { RegisterUser };
