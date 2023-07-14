import React from "react";
import {Link} from "react-router-dom";
import "./recipeItem.scss"

const RecipeItem = ({item, onContextMenu, isSelected}) => {

    const handleRightClick = (event) => {
        event.preventDefault();
        onContextMenu(item.id);
    };

    return (
        <div className="item__wrapper">
            <Link to={"/" + item.id} className={`item__link ${isSelected ? 'selected' : ''}`}
                  onContextMenu={handleRightClick}>
                <div className="item__link--image">
                    {isSelected &&
                        <svg className="item__selected" xmlns="http://www.w3.org/2000/svg" height="1em"
                             viewBox="0 0 512 512">
                            <path
                                d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                        </svg>
                    }
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