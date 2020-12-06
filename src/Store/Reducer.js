const reducer = (state, action) => {
    switch (action.type) {
        case 'DATAFROMFIREBASE':
        console.log('data')
            return {
                ...state,
                subCat:action.payload
            }
        case 'DATAFROMFIREBASECAT':
            return {
                ...state,
                cat:action.payload
            }
        case 'DATAFROMFIREBASEIMAGES':
            return {
                ...state,
                img:action.payload
            }
        case 'ADDTOCART':
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
        default:
            return state;
    }
};
export default reducer;