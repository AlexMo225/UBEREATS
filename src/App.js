import React, { useState, useEffect, useRef } from "react";
import { Monheader } from "./Monheader.js";
import RestoImage1 from "./kebab.jpg";
import RestoImage2 from "./kfc.jpeg";
import "./App.css";
import "./main.css";
import "./index.css";
import Logo from "./logo.svg";
import Macdo from "./Image6.jpeg";
import Kebab from "./ptite-galette.png";
import KFC from "./176695810-moscou-russie-9-juillet-2020-beaucoup-d-ailes-chaudes-ou-de-lanières-de-poulet-kfc-dans-un-seau.jpg";
import Sandwich from "./istockphoto-157431311-612x612.jpg";

// Composant BurgerBlock
function BurgerBlock({
    imagePath,
    burgerName,
    price,
    addToCart,
    removeFromCart,
}) {
    const [qte, setQte] = useState(0);

    const incrementQte = () => {
        setQte(qte + 1);
        addToCart(1);
    };

    const decrementQte = () => {
        if (qte > 0) {
            setQte(qte - 1);
            removeFromCart(1);
        }
    };

    return (
        <div className='shops--block'>
            <img href='#' className='menu' src={imagePath} alt={burgerName} />
            <p className='block__desc'>{burgerName}</p>
            <p className='block__prix'>{price}</p>
            <div className='quantity-group'>
                <button className='moin' onClick={decrementQte}>
                    -
                </button>
                <button className='quantite'>{qte}</button>
                <button className='plus' onClick={incrementQte}>
                    +
                </button>
            </div>
        </div>
    );
}

function App() {
    const [cart, setCart] = useState(0);
    const [restaurants, setRestaurants] = useState([
        { id: 1, name: "Restaurant 1", isOpen: false, image: RestoImage1 },
        { id: 2, name: "Restaurant 2", isOpen: true, image: RestoImage2 },
        // Ajoutez d'autres restaurants ici...
    ]);

    // useRef pour suivre l'état initial du montage du composant
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false; // Après le premier montage, définir à false
        } else {
            // Mettre à jour seulement si le restaurant change d'état
            restaurants.forEach((restaurant) => {
                if (restaurant.isOpen) {
                    console.log(`${restaurant.name} est maintenant ouvert.`);
                    // Autres actions nécessaires quand un restaurant ouvre
                }
            });
        }
    }, [restaurants]);

    const addToCart = (quantity) => {
        setCart(cart + quantity);
    };

    const removeFromCart = (quantity) => {
        setCart(cart - quantity);
    };

    const toggleRestaurantStatus = (id) => {
        setRestaurants(
            restaurants.map((restaurant) =>
                restaurant.id === id
                    ? { ...restaurant, isOpen: !restaurant.isOpen }
                    : restaurant
            )
        );
    };

    return (
        <>
            <Monheader />
            <div className='App'>
                <header>
                    <div className='container'>
                        <div className='header'>
                            <div className='headerlogo'>
                                <img
                                    className='logi'
                                    src={Logo}
                                    alt='Image du menu'
                                />
                            </div>
                            <div className='header--address'>
                                <input
                                    type='text'
                                    name=''
                                    id=''
                                    placeholder='*****'
                                />
                                <p>to</p>
                                <input
                                    type='text'
                                    name=''
                                    id=''
                                    placeholder='******'
                                />
                            </div>
                            <div className='header--buttons'>
                                <div>
                                    <a href='#'>Sign In</a>
                                    <a href='#'>Register</a>
                                </div>
                                <div class='cart-icon'>
                                    <div>
                                        <iconify-icon
                                            icon='ion:cart'
                                            width='30'
                                            height='30'></iconify-icon>
                                    </div>
                                    <div id='cart' class='bubble'>
                                        {cart}
                                    </div>
                                </div>
                                <div className='header--cart'>
                                    <svg
                                        viewBox='0 0 40 72'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className='shops'>
                    <div className='container'>
                        <div className='shops--title'>
                            <h1>Offres du jour</h1>
                        </div>
                        <div className='shopsblocks'>
                            <BurgerBlock
                                imagePath={Macdo}
                                burgerName='Menu MacDo™'
                                price='12,50 €'
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                            <BurgerBlock
                                imagePath={Kebab}
                                burgerName='Kebab™'
                                price='8,50 €'
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                            <BurgerBlock
                                imagePath={KFC}
                                burgerName='KFC™'
                                price='10,00 €'
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                            <BurgerBlock
                                imagePath={Sandwich}
                                burgerName='Sandwich™'
                                price='3,50 €'
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        </div>
                    </div>
                </section>

                {/* Section Restaurants */}
                <section className='restaurants'>
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className='restaurant'>
                            <img src={restaurant.image} alt={restaurant.name} />
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.isOpen ? "Ouvert" : "Fermé"}</p>
                            <button
                                onClick={() =>
                                    toggleRestaurantStatus(restaurant.id)
                                }>
                                Changer l'état
                            </button>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}

export default App;