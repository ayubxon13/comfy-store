import {Outlet} from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function HomeLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="max-container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default HomeLayout
