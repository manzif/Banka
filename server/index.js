import express from 'express';
import userRoutes from './routes/user';
import accountRoutes from './routes/account';
import transactionRoutes from './routes/transaction';

const app = express();


app.use(express.json());

app.use(userRoutes);
app.use(accountRoutes);
app.use(transactionRoutes);

app.get('/', function(req, res){
    res.send('Hello world');

});
app.get('*', function(req, res){
    res.status(404).json({ status: 404, message: 'Page not found' });
});
app.get('text/plain', function(req, res){
    res.status(404).json({ status: 404, message: 'Page not found' });
});
app.post('*', function(req, res){
    res.status(404).json({ status: 404, message: 'Page not found' });
});
app.post('text/plain', function(req, res){
    res.status(404).json({ status: 404, message: 'Page not found' });
});

//port
const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`listening on port ${port}...`);
});

export default app;