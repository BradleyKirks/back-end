import express from "express";
import cors from "cors"
import { db } from "./utils/dbConnect.js";



const app = express()
app.use(cors())
app.use(express.json())

const blogPosts = db.collection("BlogPosts")


// app.get('/', (req, res) => {
//     res.send('hello')
// })



app.get('/', async (req, res) => {
    const allPosts = await blogPosts.find().toArray()
    console.log('allPosts -> ', allPosts)
    res.send(allPosts)
})

app.post('/', async (req, res) => {
	const newBlogPost = { title: req.body.title, content: req.body.content }
	await blogPosts.insertOne(newBlogPost)

	const allPosts = await blogPosts.find().toArray()
	res.send(allPosts)
})


app.listen(process.env.PORT ||'8080', () => console.log('api listeing on port 8080'))

// const allBlogPosts = await blogPosts.find().toArray()
// console.log('allPosts ->', allBlogPosts)
// res.json('here are some blog posts, not yet! 🥶')
// const addeditem = await blogPosts.insertOne(Newblogposts)
// res.send(addeditem)

// const MONGO_URI = "mongodb+srv://spinnyorb23:cBwPLonGEKKWFsYR@myfirstcluster.fj0o5tg.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient = (MONGO_URI)
// const db = client.db('blogappp-c12')
// const blogPosts = db.collection("blog-posts")
// client.connect()

// console.log('connected to Mongo')