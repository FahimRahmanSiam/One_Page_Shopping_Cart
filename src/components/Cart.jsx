import React from 'react'
import './css/Cart.css'

export default function Cart({isToggle,setToggle,cartItems,setCartItems,cartCount,cartLength,addToCart,removeFromCart}) {

    // this makes the whole cart empty by setting cart to empty array, this is the work of the clear cart button
    const clearCart=()=>{
        setCartItems([]);
    }
    //A simple display alert for placing the order
    const handleCheckOut=()=>{
        alert("Your order has been placed!");
    }
    // a function that removes a particular item from the cart regardless of the quantity of it
    const remove=(item)=>{
        setCartItems(cartItems.filter((x)=>x.id !==item.id));
    }
    // calculates the subtotal of the cart by constantly adding total price of a particular item with the next one
    // here "a" represents the previous total price, "c" represents current product in the cart array, the 0 at the end means we set initial value for a=0
    const subTotal=cartItems.reduce((a,c)=>a+c.price*c.qty,0); 
    return (// when is Toggle is true, cart is expanded, otherwise shriked or hidden
        <>
        <div className={isToggle ? "cartExpand" : "cartShrink"}>
            <h1>Cart</h1>
            {/* the close button will set the toggle to false which will again shrink the cart */}
            <div className="closeCart" onClick={()=>setToggle(false)}>X</div>
            <h3>Your Items : total {cartCount}, on {cartLength} products</h3><hr/>
            <div className="emptyCart">{cartItems.length===0 && <div>Cart is empty!!</div>}</div>
            {  //each item in the cart array is mapped here
                cartItems.map((item)=>(
                    <div className="cartItems" key={item.id}>
                        <button className="cartREMOVE" onClick={()=>remove(item)}>X</button>
                        <div className="cartImage">
                            <img src={item.image} alt=""/>
                        </div>
                        <div className="cartProductDetails">
                            <h4>{item.title}</h4>
                        <div className="productsDetails">
                            <div><b>${item.price}</b></div>
                            <div>X {item.qty} =</div>
                            <div><b><i>${(item.price*item.qty).toFixed(2)}</i></b></div>  {/*the value is fixed upto 2 decimal points */}
                        </div>
                            <div className="cartFunctionButton">
                                <button className="cartADD" onClick={()=>addToCart(item)}>ADD</button> {/*triggers the addToCart function */}
                                <button className="cartSUBTRACT" onClick={()=>removeFromCart(item)}>SUBTRACT</button> {/*triggers the removeFromCart function */}
                            </div>
                        </div>
                    </div>
                ))
            }
            <br/><br/>
            <hr/><br/><br/>
            {// if the cartItem's length is 0 which is, there is no item in cart, then display these lines
                cartItems.length===0 ? <div></div> :
            <h2>Your total price is:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   <i>৳{subTotal.toFixed(2)}</i></h2>
            }  {/* &nbsp; stands for one single space in html*/}
            {   //if length is 0, show nothing, otherwise show the two buttons checkout and clear cart.
                 cartItems.length===0 ? (<div></div>) :   
                (<div className="finalButtons">
                    <button className="CheckOut" onClick={()=>handleCheckOut()}>Checkout</button>
                    <button className="ClearCart" onClick={()=>clearCart()}>Clear Cart</button>
                </div>)
            }
        </div>   
        </>
    )
}
