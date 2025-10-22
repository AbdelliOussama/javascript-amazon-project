import {cart, removeFromCart,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import {products,getProductById} from '../../data/products.js';
import {formatCurrency} from '.././utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'   ;
import { deliveryOptions ,getDeliveryOptionById,calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderCartSummary(){
    let cartSummaryHTML = '';
    
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct = getProductById(productId);
        const deliveryOptionsId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOptionById(deliveryOptionsId);
        const deliveryDateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML += `
            <div class="cart-item-container
                js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${deliveryDateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>
                    <input class="quantity-input">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}"> Save </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(cartItem, matchingProduct)}
                </div>
                </div>
            </div> `;
    });
    function deliveryOptionsHTML(cartItem, matchingProduct) {
        let deliveryOptionsHTML = '';

        deliveryOptions.forEach((deliveryOption) => {
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            deliveryOptionsHTML += `
                <div class="delivery-option js-delivery-options" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''}  class="delivery-option-input " name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dayjs().add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D')}
                        </div>
                        <div class="delivery-option-price">
                            ${deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`}
                        </div>
                    </div>
                </div>
            `;
        });
        return deliveryOptionsHTML;
    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(
            `.js-cart-item-container-${productId}`
            );
            container.remove();
            renderPaymentSummary();
        });
    });

    renderCheckoutHeader();

    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.add('is-editing-quantity');
        });
    });

    document.querySelectorAll('.js-save-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.remove('is-editing-quantity');
            const input = document.querySelector(`.js-cart-item-container-${productId} .quantity-input`);
            const newQuantity = Number(input.value);
            if (newQuantity > 0 && newQuantity <= 1000) {
                document.querySelector(`.js-cart-item-container-${productId} .quantity-label`)
                .innerText = newQuantity;
                updateQuantity(productId,newQuantity);
                renderPaymentSummary();
            }
            else
            {
                alert('Please enter a quantity between 1 and 1000');
            }
            renderCheckoutHeader();
        });
    });


    document.querySelectorAll('.quantity-input')
    .forEach((input) => {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const productId = input.dataset.productId;
                const newQuantity = Number(input.value);
                if (newQuantity > 0 && newQuantity <= 1000) {
                    document.querySelector(`.js-cart-item-container-${productId} .quantity-label`)
                    .innerText = newQuantity;
                    updateQuantity(productId,newQuantity);
                }
                else
                {
                    alert('Please enter a quantity between 1 and 1000');
                }
                renderCheckoutHeader();
            }
        });
    });

    document.querySelectorAll('.js-delivery-options')
    .forEach(option => {
        option.addEventListener('click', () => {
            const productId = option.dataset.productId;
            const newDeliveryOptionId = option.dataset.deliveryOptionId;
            updateDeliveryOption(productId, newDeliveryOptionId);
            renderCartSummary();
            renderPaymentSummary();
        });
    });
}


