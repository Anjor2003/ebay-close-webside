"use client"

import { useEffect, useState } from "react"
import Footer from "./includes/Footer"
import MainHeader from "./includes/MainHeader"
import SubMenu from "./includes/SubMenu"
import TopMenu from "./includes/TopMenu"
import Loading from "../components/Loading"

export default function Mainlayout({children}) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.addEventListener("storage", function () {
      let res = this.localStorage.getItem('isLoading')
      res === 'false' ? setIsLoading(false) : setIsLoading(true)
    })
  })
  return (
    <>
      <div id="Mainlayout" className="w-full max-w-[1300px] mx-auto px-3">
        <div>
          {isLoading ? <Loading/> : <div></div>}
          <TopMenu/>
          <MainHeader/>
          <SubMenu/>

          {children}
          <Footer/>
        </div>
      </div>
    </>
  )

}