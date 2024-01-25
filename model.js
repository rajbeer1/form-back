import mongoose from 'mongoose'



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
  players: String
});

export const SportsTeam = mongoose.model('SportsTeam', sportsTeamSchema);

