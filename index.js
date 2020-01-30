const Product = require('./products')

const express = require('express');
const app = express();

app.use(express.json());


//Get
app.get('/api/products', async function(req, res) {
  
});

//Post
app.post('/api/products', function(req, res) {
  const doc = await Product.create(req.body);
  res.send(doc)  
});


app.listen(8080, function() {
    console.log("Server listening...");
  });