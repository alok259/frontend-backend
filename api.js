const express = require("express");
const app = express();
const fs = require("fs");
const port = 80;
const rawdb = require("./data/ias.json");

app.get("/", function(request, response) {
    console.log("request received");
    response.json({
        "message": "hello",
        "version": 0.1
    });
})

app.get("/save/:name", function(request, response) {
    console.log("request received");
    let name = request.params.name;
    fs.writeFileSync("./data/db.txt", name);
    response.json({
        "message": "file saved",
        "version": 0.1
    });
})

app.get("/ias", function(request, response) {
    console.log("request received");
    response.json(rawdb);
})

app.get("/ias/:cadre", function(request, response) {
    console.log("request received");
    let cadre = request.params.cadre;
    let value = rawdb.data.find(function(datapoint){
        return datapoint[1] == cadre
    });
    if (value==undefined){
        response.json({
            "message": "record not found"
        })
    }
    else response.json(value);
})

app.listen(port, function() {
    console.log("app is running on port " + port);
})