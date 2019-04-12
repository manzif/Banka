import express from 'express';
import userRoutes from './routes/user';
import accountRoutes from './routes/account';

const app = express();


app.use(express.json());

app.use(userRoutes);
app.use(accountRoutes);

app.get('/', function(req, res){
    res.send('Hello world');

});


//port
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`listening on port ${port}...`);
});