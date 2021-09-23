import React from 'react'
import CartIcon from "./logoFiles/cart.png"
import Logo from "./logoFiles/logo.png"
import './css/Header.css'

export default function Header({isToggle,setToggle,cartCount}) {
        return (
            <>
            <header>
                <div className="menu">
                    <img src={Logo} alt=""/>
                    <h1>React Shopping Cart</h1>
                </div>
                <nav>
                    <div className="nav-cart">
                        <span>{cartCount}</span>
                        {/*when the cart image is clicked the toggle is set to true,making the cart expand*/}
                        <img src={CartIcon} alt="" width='32' onClick={()=>setToggle(true)}/>
                        <p>CART</p>
                    </div>
                </nav>
            </header>
            </>
        )
    }


