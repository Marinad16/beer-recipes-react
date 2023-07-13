import React from "react";
import {Link} from "react-router-dom";
import "./recipeItem.scss"

const RecipeItem = ({item}) => {
    return (
        <div className="item__wrapper">
            <Link key={item.id} to={"/" + item.id} className="item__link">
                <div className="item__link--image">
                    <img src={item.image_url} alt=""/>
                </div>
                <div>
                    <h2 className="item__link--title">{item.name}</h2>
                    <h3 className="item__link--subtitle">{item.tagline}</h3>
                    <p className="item__link--desc">{item.description}</p>
                </div>
            </Link>
        </div>
    );
};

export default RecipeItem;