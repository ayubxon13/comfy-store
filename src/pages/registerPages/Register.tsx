import {FormEvent, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import FormInput from "../../components/FormInput"
import {toast} from "sonner"
import {useAppDispatch} from "../../redux/store"
import {setUser} from "../../redux/user/userSlice"
import {userData} from "../../interface/allinterface"
import {Helmet} from "react-helmet"

function Register() {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const newUser = {
      username,
      email,
      password,
    }
    if ((username && email && password).trim()) {
      try {
        const req = await fetch(
          "https://strapi-store-server.onrender.com/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        )

        if (!req.ok) {
          throw new Error("Email or Username are already taken")
        }

        const res: userData = await req.json()
        navigate("/")
        setLoading(false)
        dispatch(setUser(res))
        toast.success("You have successfully registered")
        navigate("/")
      } catch (error: any) {
        setLoading(false)
        toast.error(error.message)
      }
    } else {
      toast.warning("Please enter information")
      setLoading(false)
    }
  }

  return (
    <div className="relative bg-base-100 flex flex-col justify-center min-h-screen overflow-hidden px-6">
      <Helmet>
        <title>Register page</title>
        <meta name="description" content="App Description" />
        <body />
      </Helmet>
      <div className="bg-base-100 p-6 m-auto rounded-md shadow-md max-w-[600px] w-full">
        <h1 className="text-center text-3xl font-bold">Sign up</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <FormInput
            name="username"
            disabled={loading}
            label="Username"
            placeholder="example: John"
            type="text"
          />
          <FormInput
            disabled={loading}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            type="email"
          />
          <FormInput
            disabled={loading}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <div className="mt-6">
            {loading ? (
              <button
                type="submit"
                disabled
                className="w-full cursor-not-allowed uppercase btn btn-active btn-neutral"
              >
                Sign up <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full uppercase btn btn-active btn-neutral"
              >
                Sign up
              </button>
            )}
          </div>
        </form>

        <p className="mt-8 text-xs font-light tracking-[1px] text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Register
