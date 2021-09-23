import React,{useState} from 'react'
import './css/Products.css'

export default function Products({products,setProducts,cartItems,setCartItems,addToCart,removeFromCart}) {   

    // a useState to check if a particular product's "ADD To CART" button was clicked or not 
    const [buttonClicked, setButtonClicked] = useState();
    //Individual Item count 
    //const [itemCount,setItemCount]=useState(1);

    // when "ADD To Cart" is clicked, 2 things happen 
    const buttonClickHandler=(pro)=>{ //they are :-
        addToCart(pro); //first the item is added to the cart array with the addToCart function
        setButtonClicked(pro.id); //second the product id is set to the buttonClicked variable for further use
    }
    // if any products exist in the product array, then render the following
    if(products){
        return (
            <div id="product">
                {products.map(product=>{ //maps each product on the screen from the product array
                    return(
                        <>
                        <div className="productCard" key={product.id}>
                            <ul className="productDetails">
                                <li><img src={product.image} alt="" /></li>
                                <li><div className="productName">{product.title}</div></li>
                                <li><div className="productPrice">${product.price}</div></li>
                                {// the buttonClicked holds the current product id that clicked the button ADD to Cart
                                    buttonClicked===product.id ? //if it matches with the present array's product then render the + and - button under that product
                                    (<div ><i className='fa fa-plus-circle' onClick={()=>addToCart(product)}></i> <input type="number" readOnly={true}  name="prodCount"></input> <i className='fa fa-minus-circle' onClick={()=>removeFromCart(product)}></i></div>)
                                    : //otherwise show the ADD to Cart Button for that product
                                    (<li><button className="addToCartButton" onClick={()=>buttonClickHandler(product)}>ADD TO CART</button></li>)
                                }
                                
                            </ul>
                        </div>
                        </>
                    )
                })}
            </div>
        )
    }
    else{
        return( // if the product is still loading, show this to the display!!
            <div>
                loading the products........
            </div>
        )
    }
    
}
