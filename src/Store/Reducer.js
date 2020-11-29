const reducer = (state, action) => {
    switch (action.type) {
        case 'DATAFROMFIREBASE':
            return {
                ...state,
                subCat:[...state.subCat,action.payload]
            }
        default:
            return state;
    }
};
export default reducer;