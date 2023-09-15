require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/database');
const passport = require('passport');
require('./config/passport')(passport);
const morgan = require('morgan');

mongoose.connect(dbConfig.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${dbConfig.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
    process.exit(1);
});

const app = express();
app.use(morgan('tiny'));
app.use(require('cors')());
app.use(express.json());
app.use('/users', require('./routes/users'));
app.use('/groups', require('./routes/groups'));
app.use('/lists', require('./routes/shoppingList'));
app.use('/stats', require('./routes/stats'));

app.get('/', (req, res) => {
    res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});