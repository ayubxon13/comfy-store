import {FormEvent, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import FormInput from "../../components/FormInput"
import {toast} from "sonner"
import {useAppDispatch} from "../../redux/store"
import {setUser} from "../../redux/user/userSlice"
import {userData} from "../../interface/allinterface"
import {customFetch} from "../../utils/utils"
import {Helmet} from "react-helmet"

function Login() {
  const [loading, setLoading] = useState(false)
  const [loadingG, setLoadingG] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGuestUser = async () => {
    try {
      setLoadingG(true)
      const res = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      })
      dispatch(setUser(res.data))
      toast.success("Welcome Guest User")
      setLoadingG(false)
      navigate("/")
    } catch (error: any) {
      setLoadingG(false)
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const userData = {
      identifier: email,
      password,
    }
    if ((email && password).trim()) {
      try {
        const req = await fetch(
          "https://strapi-store-server.onrender.com/api/auth/local",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        )
        if (!req.ok) {
          throw new Error("Invalid identifier or password")
        }
        const res: userData = await req.json()
        dispatch(setUser(res))
        navigate("/")
        setLoading(false)
        toast.success("Welcome back")
      } catch (error: any) {
        toast.error(error.message)
        setLoading(false)
      }
    } else {
      toast.warning("Please enter information")
      setLoading(false)
    }
  }

  return (
    <div className="relative bg-base-100 flex flex-col justify-center min-h-screen overflow-hidden px-6">
      <Helmet>
        <title>Login page</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      <div className="bg-base-100 p-6 m-auto rounded-md shadow-md max-w-[600px] w-full">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <FormInput
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            type="email"
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <div className="mt-6">
            {loading ? (
              <button
                type="submit"
                className="w-full uppercase btn-disabled btn btn-active btn-neutral"
              >
                Login <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full uppercase btn btn-active btn-neutral"
              >
                Login
              </button>
            )}
          </div>
        </form>

        <div className="mt-3">
          {loadingG ? (
            <button
              type="button"
              className="w-full uppercase btn btn-active btn-disabled btn-neutral"
            >
              Guest user <span className="loading loading-xs"></span>
            </button>
          ) : (
            <button
              onClick={() => {
                handleGuestUser()
              }}
              type="button"
              className="w-full uppercase btn btn-active btn-neutral"
            >
              Guest user
            </button>
          )}
        </div>

        <p className="mt-8 text-xs font-light tracking-[1px] text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Login
