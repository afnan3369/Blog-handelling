const mongoose= require("mongoose");
const marked= require('marked')

const slugify= require('slugify');
const creatDompurify= require('dompurify');         // step 1=>  for purify html from marked
const { JSDOM }= require('jsdom');                  //step 2
const dompurify = creatDompurify(new JSDOM().window)    //step 3


const articalsshema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    markdown:{
        type: String,
        required:true
    },
    createdAt:{
      type:Date,
      default: Date.now
    },
    slug:{
        type: String,
        required:true,
        unique:true
    },
    senitizedHtml:{
        type: String,
        required:true,
    }
    

})

articalsshema.pre('validate', function(next){
    if(this.title){
        this.slug= slugify(this.title, {lower:true, strict: true})
    }
    if(this.markdown){
        this.senitizedHtml= dompurify.sanitize(marked.parse(this.markdown))
    }
    next()
} )


module.exports= mongoose.model('artical', articalsshema )