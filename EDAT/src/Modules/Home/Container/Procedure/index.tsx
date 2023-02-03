import React, { useState, useRef, useMemo, useCallback } from "react"
import { Button, Card, Image, InputHeading } from "@Components";
import { icons } from "@Assets";
import { translate } from "@I18n";

const ADD = 1
const UPDATE = 2
const DELETE = 3

function Procedure() {
  const [focus, setFocus] = useState('')

  const [procedures, setProcedures] = useState<any>([
    {
      id: "1", value: "step:1", child: []
    },
    {
      id: "2", value: "step:2", child: []
    },
  ])



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
                const updatedNode = [...getCurrentNode(procedures, item.id, UPDATE, e.target.value)]
                setProcedures(updatedNode)
              }}
            />
          </div>
          <div className="mt-4">
            <div onClick={() => {
              let updatedNode = [...getCurrentNode(procedures, item.id, DELETE, '')]
              setProcedures(updatedNode)

            }}>
              <Image src={icons.delete} height={20} />
            </div>
            <div className='mt-2'>
              <Button
                text={'Add Sub'}
                size={"sm"}
                onClick={() => {
                  let updatedNode = [...getCurrentNode(procedures, item.id, ADD, '')]
                  setProcedures(updatedNode)
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
    return procedures?.map((item: any, index: number) => {
      return <LiComponent key={item.id} item={item} index={index} />
    })

  }

  console.log('rendered');

  return (
    <>
      <div className="container-fluid pt-5 ">
        <Card>
          <div className="card-header">
            <h3 className="mb-0 text-dark  p-2">{"Procedure"} </h3>
          </div>
          <form id="create-form">
            <div className="row">
              <div className="col-sm-12  my-3 pr-5">
                <InputHeading heading={"Procedure"} color={"text-dark"} />
                <div
                  id="tabs-icons-text"
                  role="tablist">
                  {
                    renderInput()
                  }
                </div>
                <div className="text-right mt-4">
                  <Button
                    text={"Add another"}
                    size={"md"}
                    onClick={() => {
                      let newInput = { id: procedures.length + 1, value: '', no: procedures.length + 1, child: [] }
                      setProcedures([...procedures, newInput])
                    }}
                  />

                  <Button
                    text={"Submit"}
                    size={"md"}
                    onClick={() => {
                      console.log(JSON.stringify(procedures) + "=======");

                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}

export { Procedure };