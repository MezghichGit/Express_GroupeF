const express = require("express"); // comme import en java
const app = express();  // instanciation d'un serveur Express
app.use(express.json());
app.listen(85,
    ()=>{
        console.log("Express Server Started....");
    }
)

const equipes = require("./equipes.json"); 
// requests
app.get("/equipes",(request, response)=>{
    //response.send("<h1 align=center>Liste des équipes</h1>");
    response.status(200).json(equipes);
})

app.get("/equipes/:id",(request, response)=>{
    const id = parseInt(request.params.id);
    const equipe = equipes.find(equipe =>equipe.id === id);
    response.status(200).json(equipe);
})

app.post("/equipes",(request, response)=>{
    equipes.push(request.body);
    response.status(200).json(equipes);
})

app.put("/equipes/:id",(request, response)=>{
    const id = parseInt(request.params.id);
    const equipe = equipes.find(equipe =>equipe.id === id);
    equipe.name = request.body.name;
    equipe.country = request.body.country;
    response.status(200).json(equipe);
})

app.delete("/equipes/:id",(request, response)=>{
    const id = parseInt(request.params.id);
    const equipe = equipes.find(equipe =>equipe.id === id);
    equipes.splice(equipes.indexOf(equipe),1);
    response.status(200).json(equipes);
})