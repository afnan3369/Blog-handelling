const express= require('express')   // MVC?
const mongoose= require("mongoose")
const Articale= require('./models/artical')
const articleRouter= require('./routes/articles')
const methodOverrride= require('method-override')
const app = express();

mongoose.connect('mongodb://localhost/blog')   //mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})  ??  (depending on mongodb version)

app.set('view engine', 'ejs');   // ejs enable
app.use(express.urlencoded({extended: false})) //?
app.use(methodOverrride('_method'))  //??



app.get('/',async (req, res)=>{
    const articals=await Articale.find().sort({
        createdAt: 'desc'});
    res.render('articles/index', {articles: articals})    //res.render use to access ejs file which is in views
})

app.use('/articles' , articleRouter) // articles/test/update
app.listen(5000)