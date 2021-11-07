// V A L I N O R  C O F F E E
const { initializeApp, applicationDefault} = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/chronicles", (req, res) => {

  getChronicles(db).then(response => {
    res.send(response);
  });

  // res.send(getChronicles(db));
});

app.get("/chronicles-cached", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send(getChronicles(db));
});

exports.app = functions.https.onRequest(app);


// Call Database Telperion 
initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

async function getChronicles(db) {
  const snapshot = await db.collection('eldarChronicles').get();
  const eldarList = [];
  snapshot.forEach(doc => {
    eldarList.push({id: doc.id, data: doc.data()});
})

  console.log(eldarList);
  return eldarList;
}