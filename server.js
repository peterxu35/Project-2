require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("./models/connections")
const path = require("path")
const PlayerRouter = require('./controllers/players')
const UserRouter = require('./controllers/users')
const ReviewsRouter = require('./controllers/reviews')
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = require("liquid-express-views")(express(), {
    root: [path.resolve(__dirname, "views/")],
  });

  //middleware
app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public")) 

app.use(
    session({
      secret: process.env.SECRET,
      store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
      saveUninitialized: true,
      resave: false,
    })
  );

app.use('/user', UserRouter)
app.use('/players', PlayerRouter)
app.use('/', ReviewsRouter)

app.get("/", (req, res) => {
    res.send("Here1");
  });


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port 4000`)); 
