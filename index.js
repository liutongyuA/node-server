const express = require('express')
const multer = require('multer')
const cors = require('cors')
// 指定上传到服务器的目录
const upload = multer({dest:'uploads/'})
const app = express()
app.get('/',(req,res)=>{
    res.send('hello nodejs')
})
app.options('/upload', cors())
//single里指定文件的name
app.post('/upload', cors(),upload.single('file'),(req,res)=>{
    // console.log(req.file);
    res.set('Access-Control-Allow-Origin','*')
    res.send(req.file.filename)
})
app.get('/preview/:key', cors(),(req,res)=>{
    res.sendFile(`uploads/${req.params.key}`,{
        root:__dirname,
        headers:{
            'Content-Type':'image/jpeg',
        }
    },(error)=>{
       console.log(error);
    })
})
app.listen(3000,()=>{console.log('3000端口启动了');})