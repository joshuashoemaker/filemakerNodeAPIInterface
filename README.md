# Node Interface for Filemaker Data API

## Purpose
Filemaker 16 Data API currently does not support cross origin resource sharing in browser yet. This Node server application is a restful API to act as an interface between the two. This api only takes in 'POST' request becasue it needs to look at a body for data.

This body is sent and only accepted as JSON. It follows this schema:


### POST
    {
        "data":{
            "url": "www.exxample.com/api"
            "method": "POST",
            "body": {
                "user" : "api",
                "password": "api",
                "layout" : "layout name"
            },
            "headers":{
                "Content-Type" : "application/json"
            }
        }
    }

### GET

    {
        "data":{
            "url": "www.example.com/api",
            "method": "GET",
            "body": {
            },
            "headers":{
                "Content-Type" : "application/json",
                "FM-Data-Token" : "token string"
            }
        }
    }


As stated, this api only accepts POST methods and a body of JSON. POST and GET methods called agains the FM api are defined by looking at the "method" value in "data" which exists in the body of the request.