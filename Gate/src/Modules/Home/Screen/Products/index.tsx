import React, { useEffect } from 'react'

import {useDispatch} from 'react-redux'
import {getStoreDetails} from '@Redux'

function Products() {

  const dispatch = useDispatch()

  useEffect(() => {
    const params = {
      "branch_id":"c72371df-d9e0-44f3-85a8-4a24d3ad8327"
      }
    dispatch(getStoreDetails({params}))
  }, [])

  return (
    <div>Products</div>
  )
}

export { Products}