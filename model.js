import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
});

const sportsTeamSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  college: {
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  captain: {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    emailId: { type: String, required: true },
    paymentString: { type: String, required: true },
  },
  players: [playerSchema],
});

export const SportsTeam = mongoose.model('SportsTeam', sportsTeamSchema);

