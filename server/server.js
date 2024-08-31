const http = require('http');
const PORT = 3000;
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const {MongoClient} = require('mongodb');


const server = http.createServer((req,res) =>{

let client = new MongoClient('mongodb://localhost:27017');

async function connect() {
    try {
        await client.connect();
        console.log("Database connection established")
    } catch (error) {
        console.log("error : ",error)
    }
}

connect();

//get the req url
const req_url = req.url;
console.log("req_url :", req_url);

//parse the req url
const parsed_url = url.parse(req_url);
console.log("parsed_url :", parsed_url);

if(parsed_url.pathname === '/'){
    //serve the html file on root request

    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('../client/index.html'));
}
else if(parsed_url.pathname === '/style.css'){
    res.writeHead(200,{'Content-Type' : 'text/css'});
    res.end(fs.readFileSync('../client/style.css'));
}
else if(parsed_url.pathname === '/addUser.html'){
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('../client/addUser.html'));
}
else if(parsed_url.pathname === '/script.js'){
    res.writeHead(200,{'Content-Type' : 'text/javascript'});
    res.end(fs.readFileSync('../client/script.js'));
}
else if (parsed_url.pathname === '/json'){
    res.writeHead(200,{'Content-Type' : 'text/json'})
    res.end(fs.readFileSync('../client/datas.json'))
}
else if(parsed_url.pathname === '/submit' && req.method === 'POST'){
    console.log("reached here");

    let body = '';

    req.on('data',(chunks)=> {
        console.log("chunks :", chunks);
        body += chunks.toString();
    });

    req.on('end',() => {

        let db = client.db("dms");
        let collection = db.collection("users")

        console.log("body :",body);
        // let datas =querystring.parse(body);
        // console.log("datas :",datas)

        let datas = JSON.parse(body);
        console.log("datas : ",datas);
         let name = datas.name;
         let email = datas.email;
         let password = datas.password;

        console.log("datas :",datas.name)
        console.log("datas :",datas.email)
        console.log("datas :",datas.password)
        if(!name){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid name");
            return;
        }
        if(!email){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid email");
            return;
        }
        if(!password){
            res.writeHead(400,{'Content-Type' : 'text/plain'});
            res.end("invalid password");
            return;
        }

        collection.insertOne({
            name : datas.name,
            email : datas.email,
            password : datas.password
        })
        .then((message) => {
            console.log("message :",message);
            res.writeHead(201,{'COntent-Type' : "text/plain"});
            res.end("User created Succesfully");
        })
        .catch((error) => {
            console.log("error : ",error);

            res.writeHead(400,{'Content-Type' : "text/plain"});
            res.end(error.message  ? error.message : "User creation failed");
        })
    });
}

})

server.listen(PORT, () =>{
    console.log(`server running at http://localhost:${PORT}`)
});