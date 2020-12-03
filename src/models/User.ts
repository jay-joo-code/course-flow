import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import autopopulate from 'mongoose-autopopulate'

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  authProvider: {
    // 'email'
    // 'google' | 'facebook' | 'github' | 'twitter'
    // 'kakao' | 'naver'
    type: String,
  },
  providerId: {
    type: String,
  },
  providerData: {

  }
}, { timestamps: true });

export interface UserDoc extends mongoose.Document {
  _id: string
  email: string
  password: string
  validatePassword: (candidate: string) => boolean
}

userSchema.pre('save', function(next) {
  const user = this as UserDoc;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  const SALT_WORK_FACTOR = 10;
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validatePassword = async function(candidatePassword: string) {
  const user = this as UserDoc
  // const MASTER_PASSWORD = 'dnlemal1690!';
  // if (candidatePassword === MASTER_PASSWORD) {
  //   return true;
  // }
  return bcrypt.compare(candidatePassword, user.password);
};

userSchema.plugin(autopopulate);

export default mongoose.model<UserDoc>('User', userSchema);
