const express = require("express"); // comme import en java
const app = express();  // instanciation d'un serveur Express
app.use(express.json()); // pour pouvoir faire le parsing des data json dans les requests
app.listen(85,
    () => {
        console.log("Express Server Started....");
    }
)

/**
 * Importation du client MongoClient & connexion à la DB
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'sesame4f';
let db
MongoClient.connect(url, function (err, client) {
    console.log("Connexion réussi avec Mongo");
    db = client.db(dbName);
});


// Version 2 du projet : Data dans la base mongodb

app.get('/equipes', (req, res) => {
    db.collection('equipes').find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})


app.get('/equipes/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const docs = await db.collection('equipes').find({ id }).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.post('/equipes', async (req, res) => {
    try {
        const equipeData = req.body
        const equipe = await db.collection('equipes').insertOne(equipeData)
        res.status(200).json(equipe)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.put('/equipes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const replacementEquipe = req.body
        const equipe = await db.collection('equipes').replaceOne({ id }, replacementEquipe)
        res.status(200).json(equipe)
    } catch (err) {
        console.log(err)
        throw err
    }
})

app.delete('/equipes/:id', async (req,res) => {
      try {
          const id = parseInt(req.params.id)
          const equipe = await db.collection('equipes').deleteOne({id})
          res.status(200).json(equipe)
      } catch (err) {
          console.log(err)
          throw err
      } 
    })


// Correction exo 

app.get('/joueurs', (req,res) => {
    db.collection('joueurs').find({}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
 })
 

 app.get('/joueurs/:id', (req,res) => {
    const id = parseInt(req.params.id)
    db.collection('joueurs').find({id}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
 })

 app.post('/joueurs', async (req,res) => {
    try {
      const joueurData = req.body
      const joueur = await db.collection ('joueurs').insertOne(joueurData)
      res.status(200).json(joueur)
    } catch (err)
      {
              console.log(err)
              throw err
          }
   })

   app.put('/joueurs/:id', async (req,res) => {
    try {
      const id = parseInt(req.params.id)
      const newjoueur = req.body
      const oldjoueur = (await db.collection ('joueurs').find({id}).toArray())[0]
      console.log(oldjoueur);
      oldjoueur.nom=newjoueur.nom;
      oldjoueur.numero=newjoueur.numero;
       await db.collection ('joueurs').replaceOne({id},oldjoueur)
 
      res.status(200).json(oldjoueur)
    } catch (err)
      {
              console.log(err)
              throw err
          }
 })

 app.delete('/joueurs/:id', async (req,res) => {
    try {
      const id = parseInt(req.params.id)
      const joueur = await db.collection('joueurs').deleteOne({id})
      res.status(200).json(joueur)
    } catch (err)
      {
              console.log(err)
              throw err
          }
   })

   // question2
app.get('/equipes/:id/joueurs', (req,res) => {
    const idEquipe = parseInt(req.params.id)
    db.collection('joueurs').find({idEquipe}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
 })

 // question3

app.get('/joueurs/:id/equipe',async (req,res) => {
    const id = parseInt(req.params.id)
    const joueur =await  db.collection('joueurs').findOne({id});
 
    const equipe =await db.collection('equipes').findOne({id:joueur.idEquipe});
    res.status(200).json(equipe)
    
 })

  //question4
app.get('/joueurbyName/:nom', (req,res) => {
    const nom = req.params.nom
    db.collection('joueurs').find({nom}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
 })
//Version 1 du projet : Data dans le fichier .json
//const equipes = require("./equipes.json");



/*
app.get("/equipes", (request, response) => {
    //response.send("<h1 align=center>Liste des équipes</h1>");
    response.status(200).json(equipes);
})

app.get("/equipes/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    response.status(200).json(equipe);
})

app.post("/equipes", (request, response) => {
    equipes.push(request.body);
    response.status(200).json(equipes);
})

app.put("/equipes/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    equipe.name = request.body.name;
    equipe.country = request.body.country;
    response.status(200).json(equipe);
})

app.delete("/equipes/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const equipe = equipes.find(equipe => equipe.id === id);
    equipes.splice(equipes.indexOf(equipe), 1);
    response.status(200).json(equipes);
})*/