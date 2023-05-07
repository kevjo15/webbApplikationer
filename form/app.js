const express = require("express");
const fs = require("fs");
const port = process.env.port || 8080;

const app = express();
const jsonFilePath = "./data.json";

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public", { type: 'text/javascript' }));

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/formPost", (req, res) => {
    console.log(req.body); // data we get is from the body of request
  
    let newData = req.body;
  
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
  
      let dataArray = [];
      if (data) {
        dataArray = JSON.parse(data);
      }
  
      dataArray.push(newData);
  
      let jsonData = JSON.stringify(dataArray);
  
      fs.writeFile(jsonFilePath, jsonData, (err) => {
        if (err) console.log(err);
      });
    });
  
    res.sendFile(__dirname + "/public/thanks.html");
  });
  

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port)
});

app.get('/data', (req, res) => {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) throw err;
    const dataArray = JSON.parse(data.toString());
    res.json(dataArray);
  });
});

