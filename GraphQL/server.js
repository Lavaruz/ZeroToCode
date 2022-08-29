const express = require('express')
const app = express()

const {graphqlHTTP} = require('express-graphql')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {loadFilesSync} = require('@graphql-tools/load-files')
const path = require('path')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const schema = makeExecutableSchema({
    typeDefs: [typesArray]
})

const root = {
    products: require('./model/products/products.module'),
    orders: require('./model/orders/orders.model')
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


app.listen(3000, ()=> console.log('QraphQL run at PORT 3000'))