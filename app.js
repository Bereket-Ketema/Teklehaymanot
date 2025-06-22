const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/hello/:name', (req, res) => {
    const name=req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get('/my/:age',(req,res)=>{
    const age=req.params.age;
    res.send(`your age is: ${age}`);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
