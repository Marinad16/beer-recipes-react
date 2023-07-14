import React, {useEffect, useState} from "react";
import "./recipe.scss"
import {useParams} from "react-router-dom";
import {useRecipeStore} from "../../store";

const RecipePage = () => {
    const {id} = useParams();
    const {fetchRecipe, error, recipe} = useRecipeStore((state) => ({
        error: state.error,
        fetchRecipe: state.fetchRecipe,
        recipe: state.recipe
    }))
    console.log(recipe)

    useEffect(() => {
        fetchRecipe(id)
    }, []);

    return (
        <>
            {Object.keys(recipe).length > 0 &&
                <div className="recipe__container">
                    <div className="recipe__wrapper">
                        <div className="recipe--image">
                            <img src={recipe.image_url} alt=""/>
                        </div>
                        <div className="recipe__content">
                            <h2 className="recipe--title">{recipe.name}</h2>
                            <h4 className="recipe--subtitle">{recipe.tagline}</h4>
                            <p className="recipe--desc">{recipe.description}</p>
                            <h3>Ingredients:</h3>
                            <div className="recipe__ingr">
                                <div>
                                    <h4>Hops:</h4>
                                    <ul>
                                        {
                                            recipe.ingredients.hops.map((ing, index) =>
                                                <li key={index}>
                                                    <span>{ing.name} - </span>
                                                    <span>{ing.amount.value} {ing.amount.unit} </span>
                                                    <span>Add: {ing.add} </span>
                                                    <span>Attribute: {ing.attribute}</span>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div>
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
                    </div>
                    <div className="recipe__about">
                        <h3>brewers tips</h3>
                        <p>{recipe.brewers_tips}</p>
                    </div>
                    <div className="recipe__about">
                        <h3>food pairing</h3>
                        <p>{recipe.food_pairing}</p>
                    </div>
                </div>

            }
        </>

    );
};

export default RecipePage;