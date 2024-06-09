import {useQuery} from "@tanstack/react-query"
import {useParams} from "react-router-dom"
import {customFetch} from "../utils/utils"
import {singleData} from "../interface/allinterface"
import {nanoid} from "@reduxjs/toolkit"
import {useAppDispatch} from "../redux/store"
import {setSelectData} from "../redux/cart/cartSlice"
import {useState} from "react"

function SingleProduct() {
  const {id} = useParams()
  const [selectQty, setSelectQty] = useState<number>(1)
  const {data: fetchedSingleData, isLoading} = useQuery<singleData>({
    queryKey: ["singleData"],
    queryFn: async () => {
      const {data}: singleData = await customFetch(`/products/${id}`)
      return {data}
    },
  })

  const dispatch = useAppDispatch()

  const handleSetCart = () => {
    if (fetchedSingleData) {
      dispatch(setSelectData({...fetchedSingleData, amount: selectQty}))
    }
  }

  return (
    <>
      {fetchedSingleData && (
        <>
          <div className="grid grid-cols-2 max-[1078px]:grid-cols-1  gap-2 items-center mt-12">
            <img
              className="h-[400px] w-[500px] rounded-lg"
              src={fetchedSingleData?.data.data.attributes.image}
              alt=""
            />
            <div className="grid gap-y-2">
              <p className="capitalize text-base-content text-3xl tracking-wider">
                {fetchedSingleData?.data.data.attributes.title}
              </p>
              <p className="text-xl opacity-70">
                {fetchedSingleData?.data.data.attributes.company}
              </p>
              <p className="tracking-wider font-mono">
                ${fetchedSingleData?.data.data.attributes.price}
              </p>
              <p className="tracking-wide">
                {fetchedSingleData?.data.data.attributes.description}
              </p>
              <div className="flex items-center gap-x-1">
                <p className="text-lg">Colors:</p>
                {fetchedSingleData.data.data.attributes.colors.map((color) => (
                  <button
                    style={{backgroundColor: color}}
                    key={nanoid()}
                    className={`badge w-6 h-6`}
                  ></button>
                ))}
              </div>
              <div className="grid gap-y-2">
                <p>Amount</p>
                <select
                  value={selectQty}
                  onChange={(e) => {
                    setSelectQty(parseInt(e.currentTarget.value))
                  }}
                  className="select select-bordered w-full max-w-xs"
                >
                  {Array.from({length: 20}, (_, index) => (
                    <option key={nanoid()}>{index + 1}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  handleSetCart()
                }}
                className="btn w-max flex btn-neutral mt-3"
              >
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <span className="loading loading-spinner loading-xs m-auto flex h-full mt-12"></span>
      )}
    </>
  )
}

export default SingleProduct
