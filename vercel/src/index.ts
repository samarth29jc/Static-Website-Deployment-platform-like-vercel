import express from "express";
import cors from "cors";
import {generate} from "./utils"
import simpleGit from "simple-git";
import {getAllFiles} from "./file";
import path from "path";

const app=express();
app.use(cors());
app.use(express.json());

app.post("/deploy",async (req,res)=>{
    console.log(req.body);
    const repoUrl= req.body.repoUrl;
    const id= generate();
    await simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`))

    const files=getAllFiles(path.join(__dirname,`output/${id}`));
    res.json({
        id:id
    });
})

app.listen(3000,()=>{console.log("hello")});