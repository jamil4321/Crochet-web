const reducer = (state, action) => {
    switch (action.type) {
        case 'DATAFROMFIREBASE':
            return {
                ...state,
                subCat: action.payload,
                isDataLoaded: true
            }
        case 'DATAFROMFIREBASECAT':
            return {
                ...state,
                cat: action.payload
            }
        case 'DATAFROMFIREBASEIMAGES':
            return {
                ...state,
                img: action.payload,

            }
        case 'ADDTOCART':
            const cartItem = {
                ...action.payload,
                itemAmount: action.payload.qty * action.payload.itemPrice
            }
            return {
                ...state,
                cart: [...state.cart, cartItem]
            }
        default:
            return state;
    }
};
export default reducer;