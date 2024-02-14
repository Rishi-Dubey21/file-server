const express=require("express");
const app=express();
const fs=require("fs");
const path=require("path");
const port=3000;

app.get("/files",(req,res)=>{
    const file_path=path.join(__dirname,"./files/");
    fs.readdir(file_path,"utf-8",(err,allfiles)=>{
        if(err){
            res.status(500).json({error:"We can find the files here...."});
        }else{
            res.status(200).json({filenames:allfiles});
        }
    });
});

app.get("/files/:filename" , (req,res)=>{
    const file_path=path.join(__dirname,"./files/",req.params.filename);
    fs.readFile(file_path,"utf-8",(err,data)=>{
        if(err){
            res.status(404).json({data:"We can't read your file.."});
        }else{
            res.status(200).json({
                data:data
            })
        }
    })
})

app.all('*',(req,res)=>{
    res.status(404).send("Invalid Route");
})

app.listen(port,(req,res)=>{
    console.log(`We are live on port number ${port}`);
})