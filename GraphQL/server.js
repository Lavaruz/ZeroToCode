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
    products: [
        {
            id: 'redShoe',
            description: 'Red Shoes',
            price: 100
        }
    ],
    orders: [
        {
            date: '20 August 2022',
            subtotal: 200,
            items: [
                {
                    product: {
                        id: 'redShoe'
                    },
                    quantity: 2
                }
            ]
        }
    ]
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


app.listen(3000, ()=> console.log('QraphQL run at PORT 3000'))