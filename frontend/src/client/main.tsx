import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';


import { createBrowserRouter, createRoutesFromElements, Route, BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import Layout from "./Layout";
import Home from "../components/Home";
import BodySection from "../components/BodySection";
import { link } from "fs";
import { Link } from "react-router-dom";
import Mission from "../components/Mission";
import Upgrade from "../components/Upgrade";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import Referral from "../components/Referral";
import Roadmap from "../components/Roadmap";
import AuthCallback from "../components/AuthCallback";
import Login from "../components/Login";
import Register from "../components/Register";
import CheckoutForm from "../components/CheckoutForm";
import Profile from "../components/Profile";
import Checkout from "../components/Checkout";
const stripePromise = loadStripe('pk_test_51PaKuvAI0MKbyJD7u71JRTJatC7yPo2BoCJZ1huuDaLqb0jmvq6MBnDPo7O6TPGblOXCsmuDWu0hqu58qnnlh1QJ00qprCtom2');

const router =createBrowserRouter(
  
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<BodySection/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element= {<Login/>}/>
      <Route path="register" element= {<Register/>}/>

      <Route path="mission" element={<Mission/>}/>
      <Route path="upgrade"  element={<Upgrade/>} />
      <Route path="/checkout/:priceId" element={<CheckoutForm />} />
      <Route path="referral" element={<Referral/>}/>
      <Route path="roadmap" element={<Roadmap/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="checkout" element= {<Checkout/>}/>
      <Route path="/auth/callback" element={<AuthCallback/>} />
      
      
      
    </Route> 
  )
)



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <Elements stripe={stripePromise}>
       <RouterProvider router={router}/>
     </Elements>
 
 
   
  </React.StrictMode>,
);
