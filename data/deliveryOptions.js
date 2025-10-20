import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'   ;
export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0,
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499,
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999,
    },
];

export function getDeliveryOptionById(optionId) {
    return deliveryOptions.find((option) => option.id === optionId);
}

export function calculateDeliveryDate(deliveryOption){
    let toDay = dayjs();
    let deliveryDate = toDay.add(deliveryOption.deliveryDays, 'day');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');
    return deliveryDateString;
}