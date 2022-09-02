const express = require('express')

// const {graphqlHTTP} = require('express-graphql')
const {ApolloServer} = require('apollo-server-express')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {loadFilesSync} = require('@graphql-tools/load-files')
const path = require('path')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolver.js'))

async function startApolloServer(){
    const app = express()

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray
    })

    const server = new ApolloServer({
        schema
    })
    await server.start()
    server.applyMiddleware({app, path:'/graphql'})

    app.listen(3000, ()=> console.log('QraphQL run at PORT 3000'))
}

startApolloServer()

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     graphiql: true
// }))

