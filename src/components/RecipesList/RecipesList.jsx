import React, {useEffect, useState} from "react";
import RecipeItem from "../RecipeItem/RecipeItem";
import "./recipeList.scss"

const RecipesList = () => {
    const [recipeList, setRecipeList] = useState([]);
    console.log(recipeList)

    useEffect(() => {
        fetch("https://api.punkapi.com/v2/beers?page=1&per_page=15")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                return res.json();
            })
            .then((jsonData) => {
                setRecipeList(jsonData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
            <div className="list-wrapper">
                {recipeList &&
                    recipeList.map((item, index) => (
                        <RecipeItem key={index} item={item}/>
                    ))}
            </div>
    );
};

export default RecipesList;