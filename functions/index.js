/* ~~~~~~~~~~~~~~~~~~ | V A L I N O R  C O F F E E | ~~~~~~~~~~~~~~~~~~ */

// const { initializeApp, applicationDefault } = require('firebase-admin/app');
// const { getFirestore } = require('firebase-admin/firestore');

const firebaseAdmin = require('firebase-admin');  
const initializeApp = () => firebaseAdmin.initializeApp(); 
const getFirestore = () => firebaseAdmin.firestore(); 

const functions = require("firebase-functions");
const express = require("express");
const app = express();

initializeApp({
  // credential: applicationDefault()
});
const db = getFirestore();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


/* | --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- | */
/* Router */

app.get("*/chronicles", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  // res.send(getChronicles(db));
  getChronicles(db).then(response => {
    res.send(response);
  });
});

app.get("*/histories", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  // res.send(getChronicles(db));
  getHistories(db).then(response => {
    res.send(response);
  });
});


exports.app = functions.https.onRequest(app);


/* | --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- | */
/* Controllers */

const getChronicles = async (db) => {
  const snapshot = await db.collection("eldarChronicles").get();
  const eldarList = [];
  snapshot.forEach(doc => {
    eldarList.push({id: doc.id, data: doc.data()});
})
  console.log(eldarList);
  return eldarList.length ? eldarList : {data: "coucou"};
}

const getHistories = async (db) => {
  const snapshot = await db.collection("histories").get();
  const histories = [];
  snapshot.forEach(doc => {
    histories.push({id: doc.id, data: doc.data()});
})
  console.log(histories);
  return histories.length ? histories : {data: "coucou"};
}
