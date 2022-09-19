const express= require('express')
const Artical = require('../models/artical')

const router= express.Router()  //ROUTER?

router.get('/new', (req, res)=>{
    res.render('articles/new', {artical: new Artical()})
})
router.get('/edit/:id',async (req, res)=>{
  const articles= await Artical.findById(req.params.id)
  res.render('articles/edit', {artical: articles})
})
router.get('/:slug',async(req, res)=>{
  const articale= await Artical.findOne({ slug: req.params.slug})
  if(articale==null){
    res.redirect('/');}
   else{res.render('articles/show', {article:articale})}
})

router.post('/',async (req,resp)=>{   //(server tp access these) app.use(express.urlencoded({extended: false})) //?
  let artical= new Artical({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
//createdAt: req.body.createdAt
  })
  try {
    
    const result =await artical.save();
    
    resp.redirect(`/articles/${artical.slug}`)    //artical ki id yahan sy ly k uper bhaji ha route my //?
  }catch(e){
      console.log(e);
      resp.render('articles/new', {artical:artical})
  }

})

router.put('/:id', async (req, resp)=>{
  
  let artical= new Artical({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    
//createdAt: req.body.createdAt
  })
  await Artical.deleteOne({_id:req.params.id})
  //console.log(req.params.id) 
  
  
  try {
    
    const result =await artical.save();
    
    
    resp.redirect(`/articles/${artical.slug}`)
       //artical ki id yahan sy ly k uper bhaji ha route my //?
  }catch(e){
      console.log(e);
      resp.render('articles/new', {artical:artical})
  }

})

router.delete('/:id', async (req, res)=>{
  
  const result=await Artical.deleteOne({_id:req.params.id})
  res.redirect('/');
  
})

module.exports= router