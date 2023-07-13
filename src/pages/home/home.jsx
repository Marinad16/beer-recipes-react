import React from "react";
import RecipesList from "../../components/RecipesList/RecipesList";
import "./home.scss"

const HomePage = () => {
    return (
        <>
            <h1 className="main--title">Beer recipes</h1>
            <RecipesList/>
        </>
    );
};

export default HomePage;