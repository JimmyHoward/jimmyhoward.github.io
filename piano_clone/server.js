const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (rep,res) => {
    res.render('index')
})

app.listen(5000)