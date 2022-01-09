export const addIngredient = IngName => {
    return {
        type: 'ADD_INGREDIENT',
        IngName
    }
}

export const removeIngredient = IngName => {
    return {
        type: 'REMOVE_INGREDIENT',
        IngName
    }
}