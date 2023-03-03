require('dotenv').config()

const { response } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const ShortUrl = require("./models/shortUrl")

const app = express()
const port = process.env.PORT

/** Database Connection */
const mongoURL = process.env.MongoAtlas
mongoose.connect(mongoURL, ()=> {
    console.info("database connected!")
})

app.use(express.urlencoded({ extended: false}))
app.use(express.json({ extended: false}))

app.post('/shrink', async (req, res) => {
    const shrink = await ShortUrl.create({long : req.body.longUrl})
    
    let shortUrl = req.protocol + '://' + req.get('host') + '/l/' + shrink.short

    let response = {"success": true, "data": shortUrl}
    res.send(response)
})

app.get('/l/:shortId', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short : req.params.shortId})
    if (!shortUrl) return res.sendStatus(404)
    
    res.redirect(shortUrl.long)
})


app.listen(port, ()=>{
    console.info(`app listening to port ${port}`)
})