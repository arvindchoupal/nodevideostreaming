const mongoose = require('mongoose')
const db = "mongodb+srv://Arvind7576:Sharma7576@cluster0.pzfnj.mongodb.net/blast?retryWrites=true&w=majority"
mongoose.connect(db,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
}).then(
    ()=>{
        console.log('connected mongoos')
    }
).catch((err)=>{
    console.log(err)
})

