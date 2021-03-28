const express=require("express");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

 app.get("/", function(req,res){
   res.sendfile(__dirname + "/index.html");
 });


 app.post("/", function(req,res){
   let num1=Number(req.body.num1);
   let num2=Number(req.body.num2);
   let result = num1 + num2;

   res.send("the result is :" + result);
 });
 app.get("/bmiCalculator",function(req,res){
   res.sendfile(__dirname+ "/bmiCalculator.html")
 });
 app.post("/bmiCalculator",function(req,res){
   let weight=parseFloat(req.body.weight);
   let height=parseFloat(req.body.height);
   let bmi=weight/(weight*height);
   res.send("your BMI is :" + bmi);
 });

app.listen(3000,function(){
  console.log("server is running on port 3000");
});
