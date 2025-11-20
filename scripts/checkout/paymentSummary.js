import { cart } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";
import {formatCurrency} from '.././utils/money.js';
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummary(){
    let productPriceCents = 0;
    let productShippingCents = 0;
    let itemsCount = 0
    cart.forEach((cartItem) => {
        const product = getProductById(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
        productShippingCents += deliveryOption.priceCents;
        itemsCount += cartItem.quantity;
    });
    const totalBeforeTaxCents = productPriceCents + productShippingCents;
    const estimatedTaxCents = Math.round(totalBeforeTaxCents * 0.1);
    const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;


    const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>
    <div class="payment-summary-row">
        <div>Items (${itemsCount}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(productShippingCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(estimatedTaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(orderTotalCents)}</div>
    </div>

    <button class="place-order-button js-place-order-button button-primary">
        Place your order
    </button>`
    let paymentSummaryElement = document.querySelector('.js-payment-summary');
    paymentSummaryElement.innerHTML = paymentSummaryHTML;
}


document.querySelector('.js-place-order-button')
.addEventListener('Click', async () => {
    try
    {
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            cart: cart
            })
        });

        const order = await response.json();
        addOrder(order);
        console.log('Order placed successfully:', order);

    }
    catch (error) {
    console.log('Unexpected error. Try again later.');
    }

    window.location.href = 'orders.html';
});
