import {useSelector} from "react-redux"
import {RootState, useAppDispatch} from "../redux/store"
import {logout} from "../redux/user/userSlice"
import {Link} from "react-router-dom"

function Header() {
  const dispatch = useAppDispatch()
  const {userData} = useSelector((store: RootState) => store.user)
  return (
    <header className="w-full h-10 bg-base-300">
      <div className="max-container items-center h-full flex justify-end gap-x-6">
        {userData ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">
              Hello, {userData?.user.username}
            </p>
            <button
              className="btn btn-xs btn-outline btn-neutral"
              onClick={() => {
                dispatch(logout())
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/signup" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
