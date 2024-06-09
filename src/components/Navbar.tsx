import {NavLink} from "react-router-dom"
import {navItems} from "../utils/utils"
import {useSelector} from "react-redux"
import {RootState} from "../redux/store"
import DarkMode from "./DarkMode"

function Navbar() {
  const {selectData} = useSelector((store: RootState) => store.cart)

  return (
    <div className="p-2 bg-base-200">
      <nav className="max-container max-[1024px]:p-0 flex justify-between items-center">
        <NavLink className="btn btn-neutral max-[1024px]:hidden" to={"/"}>
          C
        </NavLink>
        <div className="dropdown dropdown-right">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.href}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink to={item.href}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          <DarkMode />
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <NavLink
                to={"/cart"}
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {selectData?.length}
                  </span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
