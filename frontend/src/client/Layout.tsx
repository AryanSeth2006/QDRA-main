import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'

export default class Layout extends Component {
  render() {
    return (
      <div className='scroll-smooth'> 
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    )
  }
}
