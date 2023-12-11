// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//bring in the models
const Student = require('./student')


const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_database' and 'your_password' with your actual MongoDB credentials)
mongoose.connect('mongodb+srv://andy:Phowazia264@cluster0.dq3e6.mongodb.net/SchoolPractice?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB SchoolPractice');
});

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//Rgistration
app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
  });

  //Status
  app.get('/state.html', (req, res) => {
    res.sendFile(__dirname + '/public/state.html');
  });

// Registered
app.get('/students', async (req, res) => {
    try {
      // Fetch data from MongoDB
      const students = await Student.find().limit(10).skip((req.query.page - 1) * 10);
  
      // Render the 'students' view and pass the fetched data
      res.render('students', { students, req });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Handle form submissions
app.post('/student', async (req, res) => {
    try {
      // Create a new StudentData document
      const studentData = new Student({
        stuName: req.body.stuName,
        campus: req.body.campus,
        schoolName: req.body.schoolName,
        schoolDistrict: req.body.schoolDistrict,
        schoolTown: req.body.schoolTown,
        distanceFromBugema: req.body.distanceFromBugema,
        regNumber: req.body.regNumber,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        initialAmountPaid: req.body.initialAmountPaid,
        practiceRegistered: req.body.practiceRegistered,
        supervisor1: req.body.supervisor1,
        supervisor2: req.body.supervisor2
      });
  
      // Save the document to MongoDB
      await studentData.save()
      .then((studentData) => {

          const message = ('Hello ' + studentData.regNumber + ", You Have Registered Successfully.")
          console.log(message)

          // Send a response with a script to display an alert and redirect
          res.send(`
            <script>
              alert('${ message }');
              window.location.href = '/state.html';  // Redirect to the State page
            </script>
          `);

          //res.sendFile(__dirname + '/public/index.html');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.set('view engine', 'ejs');


// Start the server
app.listen(port, () => {
  console.log(`Server is running at  http://localhost:${port}/`);
});
