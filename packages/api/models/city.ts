import mongoose from '@/db/mongoose';

const citySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    index: true
  }
});

export const City = mongoose.model('City', citySchema);
