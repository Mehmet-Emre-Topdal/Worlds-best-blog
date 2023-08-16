import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar/>
    <main className='w-3/4 mx-auto'>
      <Outlet/>
    </main>
    </>
  )
}
