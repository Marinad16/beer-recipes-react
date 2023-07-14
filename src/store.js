import {create} from 'zustand'

export const useRecipesStore = create((set, get) => ({
    recipes: [],
    loading: false,
    error: null,
    fetchRecipes: async () => {
        set({ loading: true });

        try {
            const res = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=15`);
            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

            const jsonData = await res.json();
            set({ recipes: jsonData, error: null });
        } catch (error) {
            set({ error: error.message });
        }

        set({ loading: false });
    },
    fetchMoreRecipes: async (page  ) => {
        const { recipes } = get();
        set({ loading: true });

        try {
            const res = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=5`);
            if (!res.ok) {
                throw new Error("Failed to fetch");
            }

            const jsonData = await res.json();

            // Remove the first 5 items from the existing recipes
            const updatedRecipes = recipes.slice(5).concat(jsonData);
            set({ recipes: updatedRecipes, error: null });
        } catch (error) {
            set({ error: error.message });
        }

        set({ loading: false });
    },
    deleteRecipes: async (selectedItems) => {
        const { recipes } = get();

        const updatedRecipes = recipes.filter((recipe) => !selectedItems.includes(recipe.id));
        set({ recipes: updatedRecipes });

        //якби API дозволяло  method: "DELETE", то ми б виконали даний запит
        // try {
        //     await Promise.all(
        //         selectedItems.map(async (itemId) => {
        //             const deleteRes = await fetch(`https://api.punkapi.com/v2/beers/${itemId}`, {
        //                 method: "DELETE",
        //             });
        //             if (!deleteRes.ok) {
        //                 throw new Error("Failed to delete recipe");
        //             }
        //         })
        //     );
        // } catch (error) {
        //     set({ error: error.message });
        // }

        //оскільки API не дає можливості видаляти елементи, тому ми отримаєм ті самі рецепти
        await get().fetchRecipes();
    }
}))

export const useRecipeStore = create((set) => ({
    recipe: {},
    loading: false,
    error: null,
    fetchRecipe: async (id) => {
        set({loading: true})

        fetch(`https://api.punkapi.com/v2/beers/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                return res.json();
            })
            .then((jsonData) => {
                set({recipe: jsonData[0], error: null});
            })
            .catch((error) => {
                set({error: error.message})
            });

        set({loading: false})
    }
}))