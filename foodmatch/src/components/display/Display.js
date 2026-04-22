import "./Display.css";
import { useState } from "react";

const Display = ({ currentRestaurant, likeButton, dislikeButton }) => {
    if (likeButton && dislikeButton && currentRestaurant) {
        return (
            <div id="results">
                {currentRestaurant && (
                    <>
                        <b>{currentRestaurant.name}</b><br/>
                        <img src={currentRestaurant.image_url} width="200"/><br/>
                        Rating: {currentRestaurant.rating}<br/>
                        Address: {currentRestaurant.location.address1}, {currentRestaurant.location.city}<br/>
                        Reviews: {currentRestaurant.url}<br/>
                    </>
                )}
                <div id="buttons">
                    {likeButton}
                    {dislikeButton}
                </div>
            </div>
        )
    }
    else {
        return (
            <div id="results">
                {currentRestaurant && (
                    <>
                        <b>{currentRestaurant.name}</b><br/>
                        <img src={currentRestaurant.image_url} width="200"/><br/>
                        Rating: {currentRestaurant.rating}<br/>
                        Address: {currentRestaurant.location.address1}, {currentRestaurant.location.city}<br/>
                        Reviews: {currentRestaurant.url}<br/>
                    </>
                )}
            </div>
        )
    }
}

export default Display;