const products = [
    {
        id: 'redShoe',
        description: 'Red Shoes',
        price: 100,
        review: []
    },
    {
        id: 'blueJeans',
        description: 'Blue Jeabs',
        price: 120,
        review: []
    }
]

function getAllProducts(){
    return products
}

function getProductByPrice(min, max){
    return products.filter((product) => product.price >= min && product.price <= max)
}

function getProductById(id){
    return products.find(product => product.id == id)
}


function addNewProduct(id, description, price){
    const newProduct = {
        id,
        description,
        price,
        review: []
    }
    products.push(newProduct)
    return newProduct
}

function addNewReview(id, rating, comment){
    const productReview = getProductById(id).review
    if(productReview){
        productReview.push({
            rating,
            comment
        })
        return productReview
    }
}

module.exports = {
    getAllProducts,
    getProductByPrice,
    getProductById,
    addNewProduct,
    addNewReview
}