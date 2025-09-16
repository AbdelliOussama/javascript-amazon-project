export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];




// The code below is for adding items to the cart and updating the cart quantity display.
// It would typically be found in a file like scripts/amazon.js

export function addToCart(productId, button) {
    let matchingItem;
    cart.forEach((cartItem)=>{
            if(cartItem.id === productId)
            {
                matchingItem = cartItem;
            }
        })
        if(matchingItem)
        {
            matchingItem.quantity +=parseInt(button.parentElement.querySelector('select').value);
        }
        else
        {
            cart.push({
                id: productId,
                quantity: parseInt(button.parentElement.querySelector('select').value)
            })
        }
}