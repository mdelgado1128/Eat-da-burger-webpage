const express = require("express");
const exhbs = require("express-handlebars");
const routes = require("./controllers/burgers_controller");

const app = express();

const PORT = process.env.POPRT || 8080;

app.use(express.static('public'));

app.engine('handlebars', exhbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(routes);


app.listen(PORT, () => {
console.log(`Server listening on http://localhost: ${PORT}`);
});