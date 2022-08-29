const orders = [
    {
        date: '20 August 2022',
        subtotal: 200,
        items: [
            {
                product: {
                    id: 'redShoe',
                    description: 'Red Shoes Super',
                    price: 100
                },
                quantity: 2
            }
        ]
    }
]

function getAllOrders(){
    return orders
}

module.exports = {
    getAllOrders
}