const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check} = require('express-validator')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')


const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://www.example.com' : '*',
}

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests,
  })


const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
})

const app = express()


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors(origin))
app.use(compression())
app.use(helmet())
app.use(limiter)

const getBooks = (request, response)=>{
    pool.query('SELECT * FROM books',(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addBook = (request, response) => {
    const {author,title} = request.body

    pool.query('INSERT INTO books (author,title) VALUES($1,$2)',[author,title],error => {
        if(error){
            throw error
        }

        response.status(201).json({status:'success',message:'Book added.'})
    })
}

app
    .route('/books')
    //GET endpoint
    .get(getBooks)
    //POST endpoint
    .post(postLimiter,addBook)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express,っっd and Postgres API' })
  })

// when a random route is inputed
  app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.',
  }));


  app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
  })

