import React, {useEffect, useState} from "react";
import "./recipe.scss"

const RecipePage = () => {
    const [recipe, setRecipe] = useState()
    console.log(recipe)

    useEffect((id) => {
        fetch(`https://api.punkapi.com/v2/beers/1`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                return res.json();
            })
            .then((jsonData) => {
                setRecipe(jsonData[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {recipe &&
                <div className="recipe__container">
                    <div className="recipe__wrapper">
                        <div className="recipe--image">
                            <img src={recipe.image_url} alt=""/>
                        </div>
                        <div className="recipe__content">
                            <h2 className="recipe--title">{recipe.name}</h2>
                            <h3 className="recipe--subtitle">{recipe.tagline}</h3>
                            <p className="recipe--desc">{recipe.description}</p>
                            <div className="recipe__ingr">
                                <h3>Ingredients:</h3>
                                <h4>Hops:</h4>
                                <ul>
                                    {
                                        recipe.ingredients.hops.map((ing, index) =>
                                            <li key={index}>
                                                <span>{ing.name} - </span>
                                                <span>{ing.amount.value} {ing.amount.unit}</span>
                                                <p>Add: {ing.add}</p>
                                                <p>attribute: {ing.attribute}</p>
                                            </li>
                                        )
                                    }
                                </ul>
                                <h4>Malt:</h4>
                                <ul>
                                    {
                                        recipe.ingredients.malt.map((ing, index) =>
                                            <li key={index}>
                                                <span>{ing.name} - </span>
                                                <span>{ing.amount.value} {ing.amount.unit}</span>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>brewers tips</h3>
                        <p>{recipe.brewers_tips}</p>
                    </div>
                    <div>
                        <h3>food pairing</h3>
                        <p>{recipe.food_pairing}</p>
                    </div>
                </div>

            }
        </>

    );
};

export default RecipePage;