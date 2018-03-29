import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const animalSchema = new Schema({
  name: String,
  type: String,
  owned: Boolean,
  owner: String,
  foundBy: String,
});

export const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});