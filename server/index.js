import express from 'express';
import userRoutes from './routes/user';

const app = express();


app.use(express.json());

app.use(userRoutes);

app.get('/', function(req, res){
    res.send('Hello world');

});


//port
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`listening on port ${port}...`);
});