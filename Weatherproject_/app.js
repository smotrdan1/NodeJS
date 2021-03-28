const express=require("express");
const https=require("https");
const app= express();
const bodyParses=require("body-parser");
app.use(bodyParses.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendfile(__dirname+"/index.html")
});

app.post("/",function(req,res){

const query=req.body.cityName;
const apiKey="6f65be212b6fe2639756230fa1f3b8c9";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData=JSON.parse(data);

    const temp=weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
    res.write("<html>")
    res.write("<h2>the weather currently is"+ weatherDescription+"</h2>" );
    res.write("<h1>the tempeture in " +query+ " is "+ temp + " degrees Celcius</h1>")
    const icon=weatherData.weather[0].icon;
    const imgURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png"
    res.write('<head><meta charset="utf-8"></head>');
    res.write("<img src=" + imgURL +">");
    res.write("</html>")
    res.send()
  })
})
});



app.listen(3000,function(){
  console.log("server is running on port 3000");
});
