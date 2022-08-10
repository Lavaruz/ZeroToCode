require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const https = require('https')
const fs = require('fs')
const path = require('path')

// SECURITY
const passport = require('passport')
const StrategyOAuth = require('passport-google-oauth20').Strategy
const cookieSession = require('cookie-session')

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_MAIN_SECRET: process.env.COOKIE_MAIN_SECRET,
    COOKIE_SECOND_SECRET: process.env.COOKIE_SECOND_SECRET
}

const strategyOption = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "https://localhost:3000/auth/google/callback"
}

function verify(accessToken, refreshToken, profile, done){
    console.log('Google Profile : ', profile);
    done(null, profile)
}

passport.use(new StrategyOAuth(strategyOption, verify))
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((user,done)=>{
    done(null, user)
})

const app = express()
app.use(helmet())
app.use(cookieSession({
    name: 'S_LOG_SES',
    keys: [config.COOKIE_MAIN_SECRET, config.COOKIE_SECOND_SECRET],
    maxAge: 1000 * 60 * 60 * 24
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))


// GOOGLE OAUTH.2.0
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
    // Successful authentication, redirect home.
        res.redirect('/');
});




function checkLogin(req,res,next){
    isLogin = req.isAuthenticated() && req.user
    if (!isLogin){
        return res.status(401).json({
            error: 'You have to login'
        })
    }
    next()
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'base.html'))
    // console.log(req.isAuthenticated());
})

app.get('/secret',checkLogin, (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'secret.html'))
})

https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
},app).listen(3000, () => console.log('server run'))