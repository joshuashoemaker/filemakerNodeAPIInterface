const express = require('express');
const app = express();
    
const bodyParser = require('body-parser');

const axios = require('axios');


// parse application/json
app.use(bodyParser.json())


app.post('/interface', (req, res) => {

    const data = req.body.data;

    if(data.method === "POST"){
        post(data)
        .then(function(response){
            res.send(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if(data.method === "GET"){
        get(data)
        .then(function(response){
            res.send(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    else{
        res.send('Request not possible. Most likly this error is cause by the "Method" not being set in your request body');
    }
})


const post = data =>{
    return axios.post(data.url, data.body, {headers : data.headers});
}

const get = data =>{
    return axios.get(data.url,  {headers : data.headers});
}

app.listen(8000, () => console.log("FM Data API Interface listening on port 8000"));