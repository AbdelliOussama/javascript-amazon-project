
import { updateCartQuantity } from '../../data/cart.js';
export function renderCheckoutHeader() {
    let cartQuantityElement = document.querySelector('.js-checkout-header-middle-section');
        cartQuantityElement.innerText = `${updateCartQuantity()} items`;
}