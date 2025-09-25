const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

MongoClient.connect(url)
  .then(my => {
    const db = my.db("mashupdb");
    const mydata = [ { name: "arjun", city: "kannur" },{ name: "meera", city: "kochi" },{ name: "laskshmi", city: "calicut" } ];
    return db.collection("details").insertMany(mydata)
    .then(() => {
    return db.collection("details") .find({}, { projection: { _id: 0} }).toArray();
    })
      .then(res => {
        console.log("Insertion Completed");
        console.log("Data:", res);
      
        my.close();
      });
  })
  .catch(err => {
    console.error(err);
  });