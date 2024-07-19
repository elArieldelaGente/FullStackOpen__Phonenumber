// eslint-disable-next-line no-undef
const express = require ('express')
// eslint-disable-next-line no-undef
const morgan = require('morgan')
// eslint-disable-next-line no-undef
const cors = require('cors')
const app = express()

const PORT = 3002


let persons = [
      { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-642312"
      }
 ]

app.use(cors())
 app.use(express.json())
 app.use(morgan('tiny'))     


app.get('/api/persons', (req, res) => {
      console.log(persons);
      res.json(persons)
})

app.get('/info',(req, res)=> {
      const people = persons.length
      const date = new Date().toUTCString()

      res.send(`
            <p>Phonebook has info for ${people} people</p>
            <p>${date}</p>
      `)
})

app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find( p => p.id === id)

      if(person){
            console.log(person);
            res.json(person)
      } else {
            res.status(404)
            res.send('<p>404 Resource not found</p>')
      }
})

app.delete('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)

      persons = persons.filter(p => p.id !== id)

      res.status(204)
      console.log(persons);
      res.send(persons)
})

app.post('/api/persons', (req, res) => {

      const body = req.body
      
      if ( ! body.name || !body.number ){
            return res.status(400).json({
                  err: "Name or number missing"
            })
      }

      const isNamePresent = persons
                                                .map(person => person.name)
                                                .some(name => 
                                                      (name.toLowerCase())
                                                            .includes((body.name).toLowerCase()))

      if ( isNamePresent){
            return res.status(400).send('<p>Error. Name must be unique</p> ')
      }    

      
      const person = {
            id: parseInt( Math.random() * 10000000),
            name: body.name,
            number: body.number
      } 

      persons = persons.concat(person)
      console.log(persons);

      res.json(persons)    
})





app.listen(PORT, ()=>{
      console.log(`Server runnig on port: ${PORT}`);
})
