import {Link} from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-base-300 mt-20">
      <div className="max-container p-3">
        <h6 className="text-xs sm:text-sm flex my-2 justify-center gap-x-1">
          Copyright © {new Date().getFullYear()} - All right reserved by
          <Link
            target="_blank"
            className="underline hover:opacity-75"
            to="https://ayubxonuz.vercel.app"
          >
            AyubxonUz
          </Link>
        </h6>
      </div>
    </footer>
  )
}
export default Footer
