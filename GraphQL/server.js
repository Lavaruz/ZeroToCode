const express = require('express')
const app = express()

const {graphqlHTTP} = require('express-graphql')
const {makeExecutableSchema} = require('@graphql-tools/schema')
const {loadFilesSync} = require('@graphql-tools/load-files')
const path = require('path')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolver.js'))

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(3000, ()=> console.log('QraphQL run at PORT 3000'))