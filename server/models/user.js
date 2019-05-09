import myqueries from '../db/myqueries';
import index from '../db/index';

const db = index.runQuery;


class UserModels{

    //get all users
async getAllUsers(){
    const result = await db.query(myqueries.getAllUsers);
    return result;
}

//get one user 

async getUser(id){
    const result =  await db.query(myqueries.getOne, [id]);
    return result;
}

//delete user 
async DeleteUser(id){
    const result = await db.query(myqueries.deleteUser, [id]);
    return result;
}

// user signup
async signup(values){
    const result =  await db.query(myqueries.signup, values);
    return result;
}

// user signin 
async signin(values){
    const result = await db.query(myqueries.signin, values);
    return result;
}
async checkUser(email){
    const result = await db.query(myqueries.getEmail, [email]);
    return result;
}
}
export default new UserModels();

