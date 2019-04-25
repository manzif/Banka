import myqueries from '../db/myqueries';
import db from '../db/index';

class UserModels{

    //get all users
async getAllUsers(){
    const getAllUsers = await db.query(myqueries.getAllUsers);
    return getAllUsers;
}

//get one user 

async getUser(id){
    const getUser =  await db.query(myqueries.getOne, [id]);
    return getUser;
}

//delete user 
async DeleteUser(id){
    const DeleteUser = await db.query(myqueries.deleteUser, [id]);
    return DeleteUser;
}

// user signup
async signup(values){
    const signup =  await db.query(myqueries.signup, values);
    return signup;
}

// user signin 
async signin(values){
    const signin = await db.query(myqueries.signin, values);
    return signin;
}

}
export default new UserModels();