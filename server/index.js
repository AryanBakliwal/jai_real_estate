const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
    key: 'user_id',
    secret: 'MoneyMoneyMoney',
    resave: false,
    saveUninitialized: false,
    cookie: {expires: new Date(253402300000000)},
}))


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Manipal@123",
    database: "jai_real_estate"
})

app.get("/", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true})
    }
    else{
        res.send({loggedIn: false})
    }
})

app.post("/register", (req, res) => {

    const name = req.body.name
    const dob = req.body.dob
    const adhar = req.body.adhar
    const phone = req.body.phone
    const username = req.body.username
    const password = req.body.password

    db.query(
        `INSERT INTO users (user_name, user_phone, user_dob, user_email, user_password, user_adhaar) VALUES('${name}', ${phone}, '${dob}', '${username}', '${password}', ${adhar});`,
        
        (err, result) => {
            if(!err){
                res.send({message: "Registered"});
                console.log('Registered!');
            }
            else{
                console.log(err);
            } 
        }
    )
})

app.get("/signin", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }
    else{
        res.send({loggedIn: false})
    }
})

app.post("/signin", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query(
        `SELECT * from users WHERE user_email = '${username}' AND user_password = '${password}';`,
        (err, result) => {
            if(err){
                res.send({ err: err })
            }
            if(result.length > 0){
                req.session.user = result;
                res.send(result);
                console.log(req.session.user);
            }
            else{
                res.send({message: "Wrong username or password"})
            }
        }
    )
    
})

app.get("/account", (req, res) => {
    if(req.session.user){
        
        db.query(
            `SELECT property.prop_name, property.price, seller.post_date, seller.post_time FROM seller, property WHERE (seller.seller_user_id = property.seller_user_id AND seller.seller_user_id = ${req.session.user[0].user_id});`,
            (err, result) => {
                if(err){
                    res.send({loggedIn: true, user: req.session.user, message: "Error!"})
                    console.log({err: err})
                }
                if(result.length > 0){
                    req.session.ads = result;
                    res.send({loggedIn: true, user: req.session.user, ads: req.session.ads})
                    console.log(req.session.ads)
                }
                else{
                    console.log("No records")
                }
                // else{
                //     res.send({loggedIn: true, user: req.session.user, message: "No records to display."})
                //     console.log("No records")
                // }
            }
        )   

    }
    else{
        res.send({loggedIn: false})
    }
})

app.get("/sell", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true})
    }
    else{
        res.send({loggedIn: false})
    }
})

app.get("/postad", (req, res) => {
    
})

app.listen(5000, () => {
    console.log('Server listening on 5000...')
})