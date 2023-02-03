import React from 'react'
import {useSelector} from 'react-redux'
function Store() {

  const { storeDetails } = useSelector((state: any) => state.CustomerReducer);
    return (
    <div>{JSON.stringify(storeDetails)+"="}</div>
  )
}

export { Store}