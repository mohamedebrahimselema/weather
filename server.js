//Server side instllation to handell every thing  out the  browser 
/* Empty JS object to act as endpoint for all routes */
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())
/* Initializing the project folder conect the  server to the  project */
app.use(express.static('website'));
const port = 3030;
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}
// GET route
app.get('/all', (req, res) => {
    res.send(JSON.stringify(projectData))
  })
  
  // Post route
  app.post('/', (req, res) => {
    projectData.temperature = req.body.temperature
    projectData.date = req.body.date
    projectData.userResponse = req.body.userresponse
    res.end()
  })
