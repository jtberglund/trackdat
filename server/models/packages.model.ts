import mongoose from 'mongoose';
import type { Package } from '../../common/types';

const packageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    carrier: {
        type: String,
        required: true,
        index: true,
    },
    trackingNumber: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
});

export default mongoose.model<Package & mongoose.Document>(
    'Package',
    packageSchema
);
