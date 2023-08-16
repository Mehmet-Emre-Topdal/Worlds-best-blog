import React from 'react'
import Navbar from '../components/Navbar'

/** Navbarı kendimiz eklemek zorundayız */

export default function ErrorPage() {
  return (

    <div>
      <Navbar></Navbar>
    <p className='text-3xl text-red-600'>Error</p>
    </div>
  )
}
