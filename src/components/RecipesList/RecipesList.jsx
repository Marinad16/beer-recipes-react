import React, {useEffect, useState} from "react";
import RecipeItem from "../RecipeItem/RecipeItem";
import "./recipeList.scss"
import {useRecipesStore} from "../../store";
import Loader from "../../assets/icons/loader";

const RecipesList = () => {
    const {loading, fetchRecipes, error, recipes, deleteRecipes, fetchMoreRecipes} = useRecipesStore((state) => ({
        loading: state.loading,
        error: state.error,
        fetchRecipes: state.fetchRecipes,
        recipes: state.recipes,
        deleteRecipes: state.deleteRecipes,
        fetchMoreRecipes: state.fetchMoreRecipes
    }))
    const [selectedItems, setSelectedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    console.log(currentPage)

    useEffect(() => {
        fetchRecipes()
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const isBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (isBottom) {
                setIsLoading(true)
                setCurrentPage(currentPage + 1);
                fetchMoreRecipes(currentPage);
                setIsLoading(false)
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]);

    const handleContextMenu = (itemId) => {
        const isSelected = selectedItems.includes(itemId);

        if (isSelected) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleDelete = () => {
        deleteRecipes(selectedItems);
        setSelectedItems([]);
    };

    return (
        <div className="list-wrapper">
            {loading ?
                <div className="loader">
                    <Loader/>
                </div>
                :
                <>
                    {recipes.map((item, index) => (
                        <RecipeItem key={index}
                                    item={item}
                                    onContextMenu={handleContextMenu}
                                    isSelected={selectedItems.includes(item.id)}/>
                    ))}
                </>
            }
            {selectedItems.length > 0 &&
                <button className="delete__button" onClick={handleDelete}>
                    Delete
                </button>
            }
        </div>
    );
};

export default RecipesList;