import { Button, Card, Input } from '@Components'
import DropDown from '@Components//Core/DropDown'
import { useInput, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import React, { useState } from 'react'
import { Form } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import { postRaiseAnonymousComplaint } from '@Redux'
import { showToast } from '@Utils'
import { ROUTES } from '@Routes'


const ISSUE_LIST = [
    { id: "Management", name: 'Management' },
    { id: "Office premises", name: 'Office premises' },
    { id: 'Co-worker', name: 'Co-worker' },
    { id: 'Transit', name: 'Transit' },
    { id: 'Others', name: 'Others' },
]

function AnonymousComplaint() {

    const [issueType, setIssueType] = useState<any>('')
    const [issueDetails, setIssueDetails] = useState('')
    const issue = useInput('')
    const dispatch = useDispatch()
    const { goTo } = useNavigation()

    const validateInputFields = () => {
        if (!issueType) {
            showToast('error', 'Issue type cannot be empty')
            return false
        }
        else if (!issue.value) {
            showToast('error', 'Issue field cannot be empty')
            return false
        }
        else if (!issueDetails) {
            showToast('error', 'Issue details field cannot be empty')
            return false
        }
        else {
            return true
        }
    }

    function handleSubmit() {
        if (validateInputFields()) {

            const params = {
                title: issue.value,
                description: issueDetails,
                tags: issueType
            }
            // console.log("paramssssissueee-->",params);

            dispatch(postRaiseAnonymousComplaint({
                params,
                onSuccess: (success: any) => {
                    showToast('success', success.message)
                    setIssueType("")
                    setIssueDetails("")
                    issue.set("")
                    // goTo('/dashboard' + ROUTES.ADMIN.)
                },
                onError: (error: string) => {
                    console.log(".......", error)
                },
            }))
        }

    }

    return (
        <div className='container-fluid pt-4 ' >
            <Card className='pb-3' >
                <div>
                    <h3>{'Raise Anonymous Complaint / Ticket'}</h3>
                    <h5 className='mt--2 text-muted'>{`
                        No information about your identity will be captured in this complaint and will be purely anonymous. Please provide as much as details as possible. So, we can serve our best.
                    `}</h5>
                </div>

                <Form className='mt-5'>
                    <DropDown
                        heading={'Issue type'}
                        placeholder={'Issue type'}
                        data={ISSUE_LIST}
                        value={issueType}
                        onChange={(e) => {
                            console.log("32222222.", e.target);

                            setIssueType(e.target.value)
                        }}
                    />
                    <div className='mt-4'>
                        <Input
                            id={'Issue'}
                            heading={'Issue'}
                            placeholder={'Issue'}
                            type={'text'}
                            value={issue.value}
                            onChange={issue.onChange}
                        />
                    </div>
                    <div>
                        <div className='mb-1 mt-2'>
                            <label className={`form-control-label`}>{'Issue Details'}</label>

                        </div>
                        <textarea
                            id={'Issue Details'}
                            className="form-control"
                            placeholder={'Issue Details'}
                            value={issueDetails}
                            onChange={(e) => {
                                setIssueDetails(e.target.value)
                            }}
                            style={{ resize: 'none', height: '15vh' }}
                        />
                    </div>
                    <div className='text-right mt-4'>
                        <Button
                            text={translate('common.submit')}
                            size={'sm'}
                            onClick={() => {

                                handleSubmit()
                            }}
                        />
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export { AnonymousComplaint }