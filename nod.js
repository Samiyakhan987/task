const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

MongoClient.connect(url)
  .then(his => {
    const db = his.db("mydatabase");
    const mydata = [ { name: "John ", city: "Trivandrum" },{ name: "Rahul", city: "calicut" },{ name: "Deepak", city: "Kollam" }, { name: "Ashwin", city: "calicut" },{ name: " Dean ", city: "Trivandrum" },{ name: "laskshmi", city: "calicut" },{name: "Rolly", city: "Alleppy" },{ name: "Nikhil", city: "Kottayam" },{ name: " Raymond ", city: "Trivandrum" } ];
    return db.collection("details").insertMany(mydata)
    .then(() => {
    return db.collection("details") .find({city: "calicut"}, { projection: { _id: 0, name: 1} }).toArray();
    })
      .then(res => {
        console.log("Displaying the names of people who are from calicut");
        console.log("Data:", res);
      
        his.close();
      });
  })
  .catch(err => {
    console.error(err);
  });