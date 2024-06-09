import {useQuery} from "@tanstack/react-query"
import {Link} from "react-router-dom"
import {customFetch, formatPrice} from "../utils/utils"
import {allData} from "../interface/allinterface"
import {FormEvent, useState} from "react"
import {BsFillGridFill, BsList} from "react-icons/bs"
import {Helmet} from "react-helmet"

function Products() {
  const [productContainer, setProductContainer] = useState(false)
  const [filterURL, setFilterURL] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 3

  const step = 1000
  const maxPrice = 100000
  const [selectedPrice, setSelectedPrice] = useState(maxPrice)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const optionsFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get("search")
    const category = formData.get("category")
    const company = formData.get("company")
    const sort = formData.get("sort")
    const shipping = formData.get("shipping") === "on" ? true : false

    setFilterURL(
      `https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${sort}&price=${selectedPrice}&shipping=${shipping}`
    )
  }

  const {data: productData, isLoading} = useQuery({
    queryKey: ["product", filterURL, page],
    queryFn: async () => {
      const {data}: allData = await customFetch(
        filterURL ??
          `https://strapi-store-server.onrender.com/api/products?page=${page}`
      )
      return data
    },
  })

  return (
    <>
      <Helmet>
        <title>Products page</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      <div>
        <form onSubmit={(e) => optionsFilter(e)}>
          <div className="grid grid-cols-1 rounded-lg mt-12 bg-primary-content gap-y-7 p-5">
            <div className="grid sm:grid-cols-2 justify-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-5 ">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Search product</span>
                </div>
                <input
                  name="search"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Select category</span>
                </div>
                <select
                  name="category"
                  defaultValue={"all"}
                  className="select select-sm select-bordered"
                >
                  <option value={"all"}>all</option>
                  <option value={"tables"}>Tables</option>
                  <option value={"chairs"}>Chairs</option>
                  <option value={"kids"}>Kids</option>
                  <option value={"sofas"}>Sofas</option>
                  <option value={"beds"}>Beds</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Select company</span>
                </div>
                <select
                  name="company"
                  defaultValue={"all"}
                  className="select select-sm select-bordered"
                >
                  <option value={"all"}>all</option>
                  <option value={"modenza"}>Modenza</option>
                  <option value={"luxora"}>Luxora</option>
                  <option value={"artifex"}>Artifex</option>
                  <option value={"comfora"}>Comfora</option>
                  <option value={"homestead"}>Homestead</option>
                </select>
              </label>{" "}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Sort by</span>
                </div>
                <select
                  name="sort"
                  defaultValue={"a-z"}
                  className="select select-sm select-bordered"
                >
                  <option value={"a-z"}>a-z</option>
                  <option value={"z-a"}>z-a</option>
                  <option value={"high"}>high</option>
                  <option value={"low"}>low</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-5 items-center justify-items-center">
              <div className="w-full">
                <p className="mb-1 text-sm">
                  Select price {formatPrice(selectedPrice)}
                </p>
                <input
                  value={selectedPrice}
                  max={maxPrice}
                  min={0}
                  step={step}
                  onChange={(e) => setSelectedPrice(Number(e.target.value))}
                  name="price"
                  type="range"
                  className="range range-sm"
                />
              </div>
              <div className="text-center">
                <p className="mb-1 text-sm">Free Shipping</p>
                <input name="shipping" type="checkbox" className="checkbox" />
              </div>
              <button type="submit" className="btn btn-neutral w-full btn-sm">
                SEARCH
              </button>
              <button type="reset" className="btn btn-sm w-full">
                RESET
              </button>
            </div>
          </div>
        </form>
        <>
          {isLoading && (
            <>
              <span className="loading mx-auto flex mt-12 loading-spinner loading-xs"></span>
            </>
          )}
          {!isLoading && (
            <>
              <div className="flex justify-between mt-5 px-4">
                <p>{productData?.data.length} products</p>
                <div className="sm:flex hidden gap-x-2">
                  <button
                    onClick={() => {
                      setProductContainer(false)
                    }}
                    className="btn btn-outline btn-circle btn-sm"
                  >
                    <BsFillGridFill />
                  </button>
                  <button
                    onClick={() => {
                      setProductContainer(true)
                    }}
                    className="btn btn-outline btn-circle btn-sm"
                  >
                    <BsList />
                  </button>
                </div>
              </div>
              <hr className="mt-5" />
              {productContainer ? (
                <div className="grid grid-cols-1 gap-y-5 my-5">
                  {productData?.data.map((data) => (
                    <Link key={data.id} to={`/products/${data.id}`}>
                      <div className="card bg-base-100 shadow-lg">
                        <figure
                          style={{alignItems: "flex-start"}}
                          className="p-3"
                        >
                          <img
                            src={data.attributes.image}
                            alt={data.attributes.title}
                            className="rounded-xl h-[120px] w-[130px] object-cover sm:h-[200px] sm:w-[200px]"
                          />
                          <div className="card-body  items-start text-center">
                            <h2 className="card-title capitalize font-medium text-xs sm:text-base">
                              {data.attributes.title}
                            </h2>
                            <p className="text-xs sm:text-base">{data.attributes.company}</p>
                          </div>
                          <p className="p-6 text-xs sm:text-base">
                            $
                            {Number(data.attributes.price).toLocaleString(
                              "en-US"
                            )}
                          </p>
                        </figure>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                  {productData?.data.map((data) => (
                    <Link key={data.id} to={`/products/${data.id}`}>
                      <div className="card w-[330px] mx-auto bg-base-100 shadow-lg">
                        <figure className="p-3">
                          <img
                            src={data.attributes.image}
                            alt={data.attributes.title}
                            className="rounded-xl h-[250px] w-full object-cover"
                          />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title capitalize font-medium">
                            {data.attributes.title}
                          </h2>
                          <p className="">${data.attributes.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div className="join w-[300px] my-5 ml-auto grid grid-cols-2">
                <button
                  onClick={() => {
                    handlePageChange(page - 1)
                  }}
                  disabled={page === 1}
                  className="join-item btn btn-outline"
                >
                  Previous page
                </button>

                <button
                  onClick={() => {
                    handlePageChange(page + 1)
                  }}
                  disabled={page == pageSize}
                  className="join-item btn btn-outline"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      </div>
    </>
  )
}
export default Products
