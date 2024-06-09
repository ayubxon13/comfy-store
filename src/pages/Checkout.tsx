import {useSelector} from "react-redux"
import FormInput from "../components/FormInput"
import {RootState, useAppDispatch} from "../redux/store"
import {FormEvent, useState} from "react"
import {customFetch, formatPrice} from "../utils/utils"
import {toast} from "sonner"
import {useNavigate} from "react-router-dom"
import {clearSelectData} from "../redux/cart/cartSlice"
import SectionTitle from "../components/SectionTitle"
import {Helmet} from "react-helmet"

function Checkout() {
  const {subtotal, orderTotal, shipping, tax, selectData} = useSelector(
    (store: RootState) => store.cart
  )
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const {userData} = useSelector((store: RootState) => store.user)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const address = formData.get("address") as string

    const newOrder = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems: selectData,
      numItemsInCart: selectData.length,
    }

    if (name && address.trim()) {
      try {
        setLoading(true)
        const res = await customFetch.post(
          "/orders",
          {
            data: newOrder,
          },
          {
            headers: {
              Authorization: `Bearer ${userData?.jwt}`,
            },
          }
        )
        dispatch(clearSelectData())
        toast.success("Orders created successfully")
        setLoading(false)
        return navigate("/orders"), res
      } catch (error: any) {
        navigate("/signup")
        toast.error("Please register to add an order")
        setLoading(false)
        return null
      }
    } else if (userData?.user.username == "demo user") {
      toast.error("Please register")
      return navigate("/signup")
    } else {
      toast.error("Please type here")
    }
  }

  return (
    <div className="mt-9">
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      {selectData.length ? (
        <>
          <SectionTitle text="Place Your Order" />
          <div className="grid grid-cols-2 max-[740px]:grid-cols-1 mt-8 items-center gap-8 justify-between">
            <div className="grid gap-y-5">
              <p className="text-xl">Shipping Information</p>
              <form onSubmit={(e) => handleSubmit(e)}>
                <FormInput
                  disabled={loading}
                  label="First name"
                  name="name"
                  placeholder="Type here"
                  type="text"
                />
                <FormInput
                  disabled={loading}
                  label="Address"
                  name="address"
                  placeholder="Type here"
                  type="text"
                />
                {loading ? (
                  <button
                    disabled
                    className="btn btn-neutral w-full uppercase text-base-100 mt-4"
                  >
                    {" "}
                    place your order <span className="loading"></span>
                  </button>
                ) : (
                  <button className="btn btn-neutral w-full uppercase text-base-100 mt-4">
                    {" "}
                    place your order
                  </button>
                )}
              </form>
            </div>
            <div className="bg-primary-content h-[180px] text-base-content text-opacity-75 pt-5 w-full px-5 rounded-lg">
              <p className="flex border-b-[1px] border-base-content border-opacity-25 pb-2 text-xs justify-between mb-3">
                Subtotal
                <span>${subtotal.toLocaleString("en-US")}</span>
              </p>
              <p className="flex border-b-[1px] border-base-content border-opacity-25 pb-2 text-xs justify-between mb-3">
                Shipping
                <span>${shipping.toFixed(2)}</span>
              </p>
              <p className="flex border-b-[1px] border-base-content border-opacity-25 pb-2 text-xs justify-between mb-3">
                Tax
                <span>${tax.toFixed(2)}</span>
              </p>
              <p className="flex text-base-content my-5 text-sm justify-between">
                Order Total
                <span>${orderTotal.toLocaleString("en-US")}</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <SectionTitle text="Your cart is empty" />
      )}
    </div>
  )
}
export default Checkout
