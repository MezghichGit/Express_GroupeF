const express = require("express");
const app = express();

app.listen(85,
    ()=>{
        console.log("Express Server Started....");
    }
)

const equipes = require("./equipes.json");

app.get("/equipes",(request, response)=>{
    response.send("<h1 align=center>Liste des équipes</h1>");
})