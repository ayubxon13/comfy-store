import {useRouteError, Link} from "react-router-dom"

interface RouteError {
  data: string
  error: {
    columnNumber: number
    fileName: string
    lineNumber: number
    message: string
    stack: string
  }
  internal: boolean
  status: number
  statusText: string
}

const Error = () => {
  const error = useRouteError() as RouteError
  console.log(error)

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">{error.status}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {error.statusText}
          </h1>
          <p className="mt-6 text-lg leading-7">{error.data}.</p>
          <div className="mt-10">
            <Link to="/" className="btn uppercase btn-neutral">
              go back home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">there was an error...</h4>
    </main>
  )
}
export default Error
