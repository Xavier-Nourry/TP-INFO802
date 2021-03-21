
const { json } = require('express');
var mongodb = require('mongodb');

var connected = false;
var db = null;

// TODO : si marche pas voir mongoose // /tp-info802?retryWrites=true&w=majority
mongodb.MongoClient.connect("mongodb+srv://MarketPlace-Admin:MarketPlace-Admin@tp-info802-xn.6gly5.mongodb.net", {useUnifiedTopology: true}).then(
    connection => {  
        connected = true;
        db = connection.db('TP-INFO802');
        console.log("Connexion MongoDB Atlas effectuée avec succès");
}).catch(error => {
    console.log("Erreur lors de la tentative de connexion à MongoDB Atlas");
});

async function queryDealsCollection(){
    if(connected){
        let jsonResponse = {
            "handsetCards" : [],
            "webCards" : []
        };

        const dealsCollectionArray = await db.collection('Articles').find().toArray();

        dealsCollectionArray.forEach(element => {
            let handsetElement = {}
            handsetElement['picture'] = element['picture'];
            handsetElement['title'] = element['name'];
            handsetElement['rows'] = element['handsetRows'];
            handsetElement['cols'] = element['handsetCols'];
            jsonResponse.handsetCards.push(handsetElement);

            let webElement = {};
            webElement['picture'] = element['picture'];
            webElement['title'] = element['name'];
            webElement['rows'] = element['webRows'];
            webElement['cols'] = element['webCols'];
            jsonResponse.webCards.push(webElement);
        });

        return jsonResponse;
    }else{
        return null;
    }
}

module.exports = {queryDealsCollection};