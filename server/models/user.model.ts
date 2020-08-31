import mongoose from 'mongoose';
import { User, AccountType } from '../types';

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: 'user',
    },
    accountType: {
        type: String, // e.g. 'Google'
        required: true,
    },
});

interface IUser {
    role: User;
    accountType: AccountType;
}

export default mongoose.model<IUser & mongoose.Document>('User', userSchema);
