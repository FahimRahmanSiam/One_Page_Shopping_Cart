import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Header';
import Products from './components/Products';
import axios from 'axios';

export default function App(){

  // a toggle useState to make the cart expand and shrink
  const [isToggle, setToggle] = useState(false);
  // the .ENV file in the src folder contains the API of the products, which is visible only to the developer
  // this url constant fetches the API key from the env file to get the product
  const url=process.env.REACT_APP_DATA_API;
  //this useState is for setting the product array
  const [products,setProducts]=useState(null);
  //this useState is for setting the cart array
  const [cartItems, setCartItems] = useState([]);
  // The total item count from line 19 to 27
  const [cartCount,setCartCount]=useState(0);
  useEffect(()=>{
    let count=0;         
    cartItems.forEach((item)=>{  // for each item of the cart the count variable is incremented
      count+=item.qty;
    });
    setCartCount(count);     
  },[cartItems,cartCount]); //whenever the cartitem or the total count is changed this iseEffect is triggered
  
// this works as the function to add to the cart array
  const addToCart=(pro)=>{
    const exist=cartItems.find(x=>x.id===pro.id); // checks if the present product exists in the array or not
    if(exist){ //if exists then find the product by itertating over the whole cart array with map function and increase the present quantity of the product by 1
      setCartItems(cartItems.map(x=>x.id===pro.id ? {...exist,qty:exist.qty+1} : x)); 
    }else{ // if the product is not in the cart, then add it with existing cart making its quantity 1
      setCartItems([...cartItems,{...pro,qty:1}]);
    }
  }
  // this works as the function to remove from the cart array
  const removeFromCart=(pro)=>{
    try { // try catch block if someone wants to make the quantity negative, I mean less than 0
      const exist=cartItems.find((x)=>x.id===pro.id); // works like the add method in this part
      if(exist.qty===1){ //if the product exists, and quantity is 1 then just filter it out of the cart
        setCartItems(cartItems.filter((x)=>x.id !==pro.id))
      }else{ // if quantity is more than 1, then just decrease the quantity
        setCartItems(cartItems.map(x=>x.id===pro.id ? {...exist,qty:exist.qty-1} : x));
      }
    } catch (error) { // an alert saying particular value for any product is already 0, if someone wants to decrease less than 0
      alert("Already the quantity is 0 for this item");
    }
  }
// this is fetching the data from the API and setting the product array.
  useEffect(() => {
      axios.get(url)
      .then(res=>{
          setProducts(res.data)
      })
  }, [url]); // everytime the URL changes, this useEffect will be triggered, like if somewants wants to add new data, it will auto fetch it

    return(// passing some props in all of the components, where they are necessary
      <div className='app'>
        <Router> 
          <Header isToggle={isToggle} setToggle={setToggle} cartCount={cartCount}/>
          <Products products={products} setProducts={setProducts} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} removeFromCart={removeFromCart}/>
          <Cart isToggle={isToggle} setToggle={setToggle} cartItems={cartItems} setCartItems={setCartItems} cartCount={cartCount} cartLength={cartItems.length} addToCart={addToCart} removeFromCart={removeFromCart}/>
        </Router>
      </div>
    )
  }


