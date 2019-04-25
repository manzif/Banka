import bcrypt from 'bcryptjs';

const Helper = {
  hashPasword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
};

export default Helper;

