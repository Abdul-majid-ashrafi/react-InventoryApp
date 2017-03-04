
const InitalState = {
    storeData: [],
    viewPurchaseData: [],
    viewSalesData: [],

};

const MainReducer = (state = InitalState, action) => {
    switch (action.type) {
        case "addStore":
            return Object.assign(state, { storeData: action.value})

        case "addProduct":
            return Object.assign(state, { productData: action.value})

        case "viewPurchase":
            return Object.assign(state, { viewPurchaseData: action.value})

        case "viewSales":
            return Object.assign(state, { viewSalesData: action.value})
    }
    return state
}
export default MainReducer