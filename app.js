const express = require('express');
const app = express();

const todoRoute = require('./routes/todoRoutes')

const morgan = require('morgan');
const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://sachin12:test1234@node-learning.vme5f.mongodb.net/node-learning?retryWrites=true&w=majority'

mongoose.connect(DB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(result => {
    console.log('Connected to database');
    const server = app.listen(3000);
}).catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.redirect('/todos');
})
app.use('/todos',todoRoute);

app.use((req, res) =>{
    res.status(404).render('404');
})
