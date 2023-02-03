import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Image, Back, InputHeading, Checkbox } from '@Components'
import { Procedure } from '@Modules'
import { icons } from '@Assets'
import { translate } from '@I18n'
import { useLoader, useNavigation } from '@Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, fetchTaskDetails, postGenericCrudDetails } from '@Redux'
import { allowedNodeEnvironmentFlags } from 'process'
import { ROUTES } from '@Routes'
import { showToast } from '@Utils'

const ADD = 1
const UPDATE = 2
const DELETE = 3

function QuestionCreation() {
    const courseLoader = useLoader(false);

    const { courseTopicName, courseTopicTasks, currentTaskItem } = useSelector(
        (state: any) => state.DashboardReducer
    );

    console.log("currentTaskItemcurrentTaskItem", currentTaskItem);


    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const [rules, setRules] = useState<any>([
        {
            id: 1, value: "", child: []
        },
    ])

    const [focus, setFocus] = useState('')

    const [question, setQuestion] = useState<string>('')
    const [sampleIOArray, setSampleIOArray] = useState<any>(
        [
            { id: 1, input: [{ id: 1, value: '' }], output: [{ id: 1, value: '' }] },
        ]
    )
    const [checked, setChecked] = useState(false);


    useEffect(() => {

        if (currentTaskItem) {
            const params = {
                task_id: currentTaskItem.id
            }

            dispatch(fetchTaskDetails({
                params,
                onSuccess: (success) => {
                    console.log("successsuccesssuccess", success);
                    prefillDetails(success.details)
                },
                onError: (error) => { }
            }))
        }
    }, [])

    const prefillDetails = (editItem) => {
        setQuestion(editItem.problem_statement)
        setRules(editItem.rules)

        const data = editItem.sample_io.map((it, index) => { return { id: index + 1, "input": it.i.map((ip, index) => { return { id: index + 1, value: ip } }), "output": it.o.map((ip, index) => { return { id: index + 1, value: ip } }) } })
        setSampleIOArray(data)

    }



    const onChangeInputHandler = (value: string, parentIndex: number, childIndex: number) => {
        let updatedSampleInput = [...sampleIOArray]
        updatedSampleInput[parentIndex].input[childIndex].value = value
        setSampleIOArray(updatedSampleInput)
    }

    const onChangeOutputHandler = (value: string, parentIndex: number, childIndex: number) => {
        let updatedSampleInput = [...sampleIOArray]
        updatedSampleInput[parentIndex].output[childIndex].value = value
        setSampleIOArray(updatedSampleInput)

    }


    const onSubmitClick = () => {
        let input: any = { inputA: [], outputA: [] }
        let finalValue = sampleIOArray.map((el) => {
            el.input.map((it) => {
                input.inputA = [...input.inputA, it.value]
            })
            el.output.map((it) => {
                input.outputA = [...input.outputA, it.value]
            })
        })
    }
    const getCurrentNode = (arr: Array<any>, id: string, current: number, updatedValue: string) => {

        const getCurrentNodeRecursive = (
            id: string,
            arr: Array<any>
        ) =>
            arr.forEach((it, index) => {
                if (it.id === id) {

                    if (current === DELETE) {
                        arr.splice(index, 1);
                    }

                    if (current === ADD) {
                        it.child = [...it.child, {
                            id: (Math.random() + 1).toString(36).substring(7), value:
                                '', child: []
                        }]
                    } else if (current === UPDATE) {
                        it.value = updatedValue
                    }
                }
                else {
                    getCurrentNodeRecursive(id, it.child);
                }
            });




        getCurrentNodeRecursive(id, arr);
        return arr;
    };



    const sampleIOArrayApiStructure = sampleIOArray.map(it => { return { "i": it.input.map(ip => ip.value), "o": it.output.map(ip => ip.value) } })

    //---------------------------- validation ---------------------------------//

    const validatePoseParams = () => {


        let input = false
        let output = false
        sampleIOArray.forEach((item) => {

            item.input.forEach((it) => {
                if (it.value.length === 0) {
                    input = false
                }
                else {
                    input = true
                }
            })
            item.output.forEach((it) => {
                if (it.value.length === 0) {
                    output = false
                }
                else {
                    output = true
                }
            })
        })


        if (question === '') {
            return false
        }
        else if ((input === false || output === false)) {
            return false
        }
        else {
            return true
        }


    }
    let isValid = true

    const onSubmit = () => {
        if (validatePoseParams() && isValid) {
            const params = {
                mq: "course__Task",
                data: {
                    name: question.substring(0, 47),
                    description: " ",
                    tag: "JS",
                    problem_statement: question,
                    rules: rules,
                    sample_io: sampleIOArrayApiStructure,
                    is_manditory: checked,
                    order_sequence: courseTopicTasks.length + 1,
                    topic_id: courseTopicName.id,
                    task_type_id: "446d0777-665d-4cd9-bf0b-a46232daec23",
                    ...(currentTaskItem && { id: currentTaskItem.id })
                },

            }
            dispatch(postGenericCrudDetails({
                params,
                onSuccess: (success: any) => {
                    showToast('success', success.message)
                    // goTo('/dashboard' + ROUTES.HOME.ADMIN_TOPIC_SECTION)
                    goBack()
                    courseLoader.hideLoader()

                },
                onError: (error: string) => {
                    courseLoader.hideLoader()
                },
            }))
        }
    }



    const validateRulesParams = (arr: Array<any>) => {



        const getCurrentNodeRecursive = (
            arr: Array<any>
        ) =>
            arr.forEach((it, index) => {

                if (it?.value === '') {
                    return isValid = false;
                }
                getCurrentNodeRecursive(it.child);
            });

        getCurrentNodeRecursive(arr);
        return isValid;
    };






    const LiComponent = ({ item, index }) => {

        return (
            <>
                <div className="row mt-2">
                    <div className="col">
                        <h5>{item.id}</h5>
                        <textarea
                            id={item.id}
                            autoFocus={item.id === focus}
                            style={{ resize: "none" }}
                            cols={5}
                            className="form-control"
                            placeholder="Type Here"
                            value={item.value}
                            onFocus={(e) => {
                                var temp_value = e.target.value
                                e.target.value = ''
                                e.target.value = temp_value
                            }}
                            onChange={(e) => {
                                setFocus(item.id)
                                const updatedNode = [...getCurrentNode(rules, item.id, UPDATE, e.target.value)]
                                setRules(updatedNode)
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <div onClick={() => {
                            let updatedNode = [...getCurrentNode(rules, item.id, DELETE, '')]
                            setRules(updatedNode)

                        }}>
                            {item.id === rules.length && rules.length > 1 && (
                                <div>
                                    <Image src={icons.delete} height={20} onClick={() => { }} />
                                </div>
                            )}
                            {/* <Image src={icons.delete} height={20} /> */}
                        </div>
                        <div className='mt-2'>
                            <Button
                                text={'Add Sub'}
                                size={"sm"}
                                onClick={() => {
                                    let updatedNode = [...getCurrentNode(rules, item.id, ADD, '')]
                                    setRules(updatedNode)
                                }}
                            />
                        </div>
                    </div>

                </div>
                {
                    item.child &&
                    item.child.map(item => (
                        <div className="ml-3">
                            <LiComponent
                                index={index}
                                item={item}
                            />
                        </div>
                    ))}
            </>
        );
    };


    const renderInput = () => {
        return rules?.map((item: any, index: number) => {
            return <LiComponent key={item.id} item={item} index={index} />
        })

    }


    console.log("houhokjoi-nnnn-----kklk",checked)

    return (
        <>
            <div className='container-fluid'>
                <div>
                    <Back text={currentTaskItem ? 'Edit Task' : 'Add Task'} />
                    <div className='float-right mr-4 font-weight-bold' style={{ marginTop: '-32px' }}>
                        <Checkbox 
                        id='1' 
                        text='isMandatory' 
                        variant={'info'}
                        defaultChecked={false}
                        onCheckChange={()=>{setChecked(!checked)}}
                         />
                    </div>
                </div>
                <Card className='mt-3'>
                    <div className='mb-3 mt--2'>
                        <h3 className='text-info'> Question</h3>
                    </div>
                    <textarea
                        className="form-control"
                        placeholder="Type the Question"
                        value={question}
                        onChange={(e) => {
                            setFocus('')
                            setQuestion(e.target.value)
                        }}
                        style={{ resize: 'none', height: '15vh' }}
                    />
                </Card>
                {sampleIOArray && sampleIOArray.length > 0 && sampleIOArray.map((el, parentIndex) => {
                    return (

                        <Card className=''>
                            <div className='mb--3'>
                                <div className='row '>
                                    <div className='col  mt--1'>
                                        <h3 className='text-info'>{` ${el.id} : Sample I/O`}</h3>
                                    </div>

                                    {el.id === sampleIOArray.length && sampleIOArray.length > 1 && (
                                        <div className='text-right mr-3 mt--1 shadow-none'>
                                            <Button
                                                text={'delete'}
                                                size={'sm'}
                                                onClick={() => {
                                                    setFocus('')
                                                    let updatedSampleInput = [...sampleIOArray]
                                                    updatedSampleInput.splice(parentIndex, 1)
                                                    setSampleIOArray(updatedSampleInput)
                                                }}
                                            />
                                        </div>
                                    )}


                                </div>
                                <ol>
                                    <>
                                        <li className='ml--4 mt-2'>
                                            <div className='row'>
                                                <div className='col-6 '>
                                                    {/* <Input
                                                    className='ml--3'
                                                    heading={'Input'}
                                                    placeholder={'Type here'}
                                                    onChange={(e) => {
                                                        let updatedSampleInput = [...sampleIOArray]
                                                        updatedSampleInput[parentIndex].input1 = e.target.value
                                                        setSampleIOArray(updatedSampleInput)
                                                    }}
                                                /> */}

                                                    {/**
                                                 * input childs
                                                 */}
                                                    {el && el?.input?.length > 0 && el.input.map((element, childIndex) => {
                                                        return (
                                                            <div className='row mr--3'>
                                                                <div className='col pr-2'>
                                                                    <Input
                                                                        className=''
                                                                        style={{ marginLeft: '-16px' }}
                                                                        placeholder={'Type here'}
                                                                        value={element.value}
                                                                        onChange={(e) => {
                                                                            setFocus('')
                                                                            onChangeInputHandler(e.target.value, parentIndex, childIndex)

                                                                        }}
                                                                    />

                                                                </div>
                                                                {/**
                                                             * input child delete
                                                            */}
                                                                {element.id === el.input.length && el.input.length > 1 && (
                                                                    <div className='ml--2 mr-4' style={{ marginRight: '30px' }}>
                                                                        <Image
                                                                            src={icons.delete}
                                                                            height={25}
                                                                            onClick={() => {
                                                                                setFocus('')
                                                                                let updatedSampleInput = [...sampleIOArray]
                                                                                let remaining = updatedSampleInput[parentIndex].input.splice(childIndex, 1)
                                                                                // let updatedSampleInput = [...sampleIOArray]
                                                                                // updatedSampleInput[parentIndex].input.splice(childIndex,1)
                                                                                // console.log("input deleted-->",updatedSampleInput);
                                                                                setSampleIOArray(updatedSampleInput)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}

                                                    <div className='text-right mt-0 mr-3'>
                                                        <Button
                                                            text={'Add Input'}
                                                            size={'sm'}
                                                            onClick={() => {
                                                                setFocus('')
                                                                let newInputField = [...sampleIOArray]
                                                                const newObject = { id: newInputField[parentIndex].input.length + 1, value: '' }
                                                                newInputField[parentIndex].input = [...newInputField[parentIndex].input, newObject]
                                                                setSampleIOArray(newInputField)
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                <div className='col-6'>
                                                    {/* <Input
                                                    heading={'Output'}
                                                    placeholder={'Type here'}
                                                    onChange={(e) => {
                                                        let updatedSampleInput = [...sampleIOArray]
                                                        updatedSampleInput[parentIndex].output1 = e.target.value
                                                        setSampleIOArray(updatedSampleInput)
                                                    }}
                                                /> */}

                                                    {/**
                                                 * output childs
                                                 */}
                                                    {el && el?.output?.length > 0 && el.output.map((element, childIndex) => {
                                                        return (
                                                            <div key={element} className='row'>
                                                                <div className='col'>
                                                                    <Input
                                                                        className=''
                                                                        style={{ marginLeft: '' }}
                                                                        value={element.value}
                                                                        placeholder={'Type here'}
                                                                        onChange={(e) => {
                                                                            setFocus('')
                                                                            onChangeOutputHandler(e.target.value, parentIndex, childIndex)

                                                                        }}
                                                                    />

                                                                </div>

                                                                {/**
                                                             * output child delete
                                                            */}
                                                                {element.id === el.output.length && el.output.length > 1 && (

                                                                    <div className='' style={{ marginRight: '15px' }}>
                                                                        <Image
                                                                            src={icons.delete}
                                                                            height={25}
                                                                            onClick={() => {
                                                                                setFocus('')
                                                                                let updatedSampleInput = [...sampleIOArray]
                                                                                updatedSampleInput[parentIndex].output.splice(childIndex, 1)
                                                                                // console.log("output deleted-->", updatedSampleInput);

                                                                                setSampleIOArray(updatedSampleInput)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                    <div className='text-right mt-0 mb-0 '>
                                                        <Button
                                                            text={'Add Output'}
                                                            size={'sm'}
                                                            onClick={() => {
                                                                setFocus('')
                                                                let newInputField = [...sampleIOArray]
                                                                const newObject = { id: newInputField[parentIndex].output.length + 1, value: '' }
                                                                newInputField[parentIndex].output = [...newInputField[parentIndex].output, newObject]
                                                                setSampleIOArray(newInputField)
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    </>
                                </ol>
                            </div>

                        </Card>

                    )
                })}

                <div className='text-right mt--2 pb-4'>
                    <Button
                        text={'Add another sample I/O'}
                        size={'sm'}
                        onClick={() => {
                            setFocus('')
                            const addNewField = {
                                id: sampleIOArray.length + 1, input: [{ id: 1, value: "" }], output: [{ id: 1, value: "" }]
                            }
                            setSampleIOArray([...sampleIOArray, addNewField])
                        }
                        }
                    />
                </div>
                {/* <Procedure /> */}
                {/* <Button text={'submit'} onClick={() => {
                    onSubmitClick()
                }} /> */}
            </div>
            <div className="container-fluid  ">
                <Card>
                    <div className='col mb--2'>
                        <h3 className='text-info ml--3 mt--2'>Rules</h3>
                    </div>
                    <form id="create-form">
                        <div className="row">
                            <div className="col-sm-12 pr-5">
                                <div
                                    id="tabs-icons-text"
                                    role="tablist">
                                    {
                                        renderInput()
                                    }
                                </div>

                                <div className="text-right mt-4">
                                    <Button
                                        text={'Add another'}
                                        size={"sm"}
                                        onClick={() => {
                                            setFocus('')
                                            let newInput = { id: rules.length + 1, value: '', child: [] }
                                            setRules([...rules, newInput])
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
                <>
                    <Button
                        className='float-right mb-4 '
                        text={"Submit"}
                        size={"md"}
                        onClick={() => {
                            setFocus('')
                            validatePoseParams()
                            console.log(validateRulesParams(rules) + "=======");

                            onSubmit()

                        }}
                    />
                </>
            </div>
        </>

    )
}

export { QuestionCreation }