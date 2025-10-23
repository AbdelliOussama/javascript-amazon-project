

function Cart(localStorageKey) {
    const cart = {
    cartItems : undefined,

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        if (!cart) {
            cart = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ];
        }
    },
    saveToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    addToCart(productId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        });

        if (matchingItem) {
        matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
        }
        this.saveToStorage();
    },
    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
            newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
        let cartQuantityElement = document.querySelector('.js-checkout-header-middle-section');
        cartQuantityElement.innerText = `${updateCartQuantity()} items`;
    },
    updateCartQuantity(){
        let cartQuantity = 0;
            this.cartItems.forEach((cartItem)=>{
                cartQuantity += cartItem.quantity;
            });
        return cartQuantity;
    },
    updateQuantity(productId,newQuantity){
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId){
                cartItem.quantity = newQuantity;
            }
        });
        this.saveToStorage();
    },
    updateDeliveryOption(productId,deliveryOptionId){
        this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId === productId){
            cartItem.deliveryOptionId = deliveryOptionId;
        }
    });
        this.saveToStorage();
    }
    }
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart-oop');
const premiumCart = Cart('premium-cart-oop');

cart.loadFromStorage();
businessCart.loadFromStorage();
premiumCart.loadFromStorage();


console.log(cart);
console.log(businessCart);
console.log(premiumCart);


