import {useSelector} from "react-redux"
import {customFetch} from "../utils/utils"
import {RootState} from "../redux/store"
import {orders} from "../interface/allinterface"
import day from "dayjs"
import SectionTitle from "../components/SectionTitle"
import {useQuery} from "@tanstack/react-query"
import {useState} from "react"
import {Helmet} from "react-helmet"

function Orders() {
  const {userData} = useSelector((store: RootState) => store.user)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)

  const {data, isLoading} = useQuery({
    queryKey: ["orders", page],
    queryFn: async () => {
      const {data}: orders = await customFetch(`/orders?page=${page}`, {
        headers: {
          Authorization: `Bearer ${userData?.jwt}`,
        },
      })
      setPageSize(data.meta.pagination.pageCount)
      return data
    },
  })

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      {userData ? (
        <div className="mt-8">
          {data && (
            <>
              <SectionTitle text="Your Orders" />
              <div className="flex justify-between">
                <h4 className="my-4 capitalize">
                  Total orders: {data.meta.pagination.total}
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Products</th>
                      <th>Cost</th>
                      <th className="hidden sm:block">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((data) => {
                      const date = day(data.attributes.createdAt).format(
                        "hh:mm a - MMM Do, YYYY"
                      )
                      return (
                        <tr className="text-xs sm:text-sm" key={data.id}>
                          <td>{data.attributes.name}</td>
                          <td>{data.attributes.address}</td>
                          <td>{data.attributes.numItemsInCart}</td>
                          <td>{data.attributes.orderTotal}</td>
                          <td className="hidden sm:block">{date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="join w-[300px] my-5 ml-auto grid grid-cols-2">
                <button
                  onClick={() => {
                    setPage((page) => page - 1)
                  }}
                  disabled={page == 1}
                  className="join-item btn-sm sm:btn-md btn btn-outline"
                >
                  Previous page
                </button>

                <button
                  onClick={() => {
                    setPage((page) => page + 1)
                  }}
                  disabled={pageSize == page}
                  className="join-item btn-sm sm:btn-md  btn btn-outline"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {data?.data.length == 1 && <SectionTitle text="Your card is empty" />}

          {isLoading && (
            <span className="loading flex mx-auto mt-8 loading-xs"></span>
          )}
        </div>
      ) : (
        <SectionTitle text="Please sign up :(" />
      )}
    </>
  )
}
export default Orders
