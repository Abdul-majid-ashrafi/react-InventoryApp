
export function signUp(user) {
    return {
        type: 'signup',
        value: user
    }
}
export function signIn(user) {
    return {
        type: "signin",
        value: user
    }
}
export function CreateStore(user) {
    return {
        type: "addStore",
        value: user
    }
}
export function CreateProduct(users) {
    return {
        type: "addProduct",
        value: users
    }
}
export function ViewStock(users) {
    return {
        type: "viewPurchase",
        value: users
    }
}
export function ViewSales(users) {
    return {
        type: "viewSales",
        value: users
    }
}

