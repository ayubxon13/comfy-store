import {Link} from "react-router-dom"
import {customFetch, imgs} from "../utils/utils"
import {useQuery} from "@tanstack/react-query"
import {featuredInt} from "../interface/allinterface"
import {nanoid} from "@reduxjs/toolkit"
import SectionTitle from "../components/SectionTitle"
import {Helmet} from "react-helmet"

function Landing() {
  const url = "/products?featured=true"
  const {isLoading, data: featured} = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const {data}: featuredInt = await customFetch(url)
      return data
    },
  })

  return (
    <>
      <Helmet>
        <title>Comfy store</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      {isLoading ? (
        <span className="loading loading-spinner flex mx-auto mt-7 loading-xs"></span>
      ) : (
        <>
          <div className="grid mt-12 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
                We are changing the way people shop
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-8">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempore repellat explicabo enim soluta temporibus asperiores aut
                obcaecati perferendis porro nobis.
              </p>
              <div className="mt-10">
                <Link to="/products" className="btn btn-primary">
                  Our Products
                </Link>
              </div>
            </div>
            <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box ">
              {imgs.map((image) => {
                return (
                  <div key={image.id} className="carousel-item">
                    <img
                      src={image.photo}
                      className="rounded-box h-full w-80 object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <SectionTitle text="Featured Products" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 my-9 gap-3">
            {featured?.data.map((item) => (
              <Link key={nanoid()} to={`/products/${item?.id}`}>
                <div className="card max-w-[330px] w-full mx-auto bg-base-100 shadow-lg">
                  <figure className="p-3">
                    <img
                      src={item?.attributes.image}
                      alt="Shoes"
                      className="rounded-xl h-[250px] w-full object-cover"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title capitalize font-medium">
                      {item?.attributes.title}
                    </h2>
                    <p className="">${item?.attributes.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}
export default Landing
