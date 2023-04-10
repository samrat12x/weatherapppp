// weather app
const express=require("express");
const { STATUS_CODES } = require("http");
const https=require("https")
const app =express();

var citynm="paris"; 

app.get("/",(req,res)=>{
    
 res.sendFile(__dirname + "/public/index.html")
 
  })


  app.get("/styles.css",(req,res)=>{
    
    res.sendFile(__dirname + "/public/styles.css")
    
     })

 

app.use(express.urlencoded({extended:true}));



app.post("/",(req,res)=>{
   
    citynm=req.body.city;
   
    const url=" https://api.openweathermap.org/data/2.5/weather?q="+citynm+"&units=metric&appid=49862eea906e7c3c81b1584589ee9c5c "
    https.get(url,(response)=>{
   console.log(response.statusCode);
   
   response.on("data",(data)=>{
    const waetherData=JSON.parse(data);
   const description=waetherData.weather[0].description;
    const temp=waetherData.main.temp
    res.header("content-type", "text/html")

  let s="stylesheet";
  let p="styles.css";
    res.write("    <head>    <link rel="+s+" href="+p+"> </head><center><h1> weather is " + description + "and temperature is " +temp + " `C </h1> ") ;
   
   const urlIcon="http://openweathermap.org/img/wn/"+ waetherData.weather[0].icon+"@2x.png"
   res.write("<img src="+urlIcon+"> </img> </center>");
   
    res.send()
   
    
     })
   
   })
   
   
     })
    
    
           // inadequate knowledge
           //</br><form action="+"/"+" method="+"post"+"> <button type="+"submit"+">submit</button> </form>
            //cant form an operation loop

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})