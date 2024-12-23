import mongoose from '@/db/mongoose';

const countrySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    index: true
  },
  code: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true 
  }
});

export const Country = mongoose.model('Country', countrySchema);
