const express = require('express')
const app = express()
const todos = require('./server_data/todos');

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})

const PORT = process.env.PORT || 8080;

async function start(){

  try{
    app.listen(PORT, () =>{
      console.log(`Server is running on port ${PORT}`)
    })
  }catch(e){
    console.warn(e)
  }
}

start()


app.get('/', (req, res) => {
  try{
    res.status(200).json(todos);
  }catch (e){
    console.log(e)
    res.status(500).json({
      message: 'Server error with getting todo list'
    })
  }  
});

app.post('/', async (req, res) => {
  try{  
    await todos.unshift(req.body);
    res.status(201).json(todos)
  }catch (e){
    console.log(e)
    res.status(500).json({
      message: 'Server error with adding todo'
    })
  }  
});

app.delete('/', async (req, res) =>{
  try{
    const index = todos.findIndex(todo => (todo.id === req.body.id));
    await todos.splice(index,1);
    res.status(200).json(todos);
  }catch (e){
    console.log(e)
    res.status(500).json({
      message: 'Server error with deleting todo'
    })
  }  
})

app.put('/', async (req, res) =>{
  try{    
    const index = todos.findIndex(todo => (todo.id === req.body.id));
    await todos.splice(index,1);
    await todos.unshift(req.body);
    res.status(200).json(todos);
  }catch (e){
    console.log(e)
    res.status(500).json({
      message: 'Server error with changing todo'
    })
  }  
})
