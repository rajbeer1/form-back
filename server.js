import express from "express";
import connectToDB from "./db.js";
import { SportsTeam } from "./model.js";
import {z} from 'zod'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
connectToDB()
app.use(express.json())
  
const captainSchema = z.object({
  name: z.string(),
  rollNumber: z.string(),
  phoneNumber: z.string(),
  age: z.number(),
  emailId: z.string().email(),
  paymentString: z.string(),
});

const collegeSchema = z.object({
  name: z.string(),
  location: z.string(),
});
app.get('/', (req, res) => {
  res.send("hi")
})
app.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    const college = data.college
    
    const captaindetails = data.captain
    const parsedcollege = collegeSchema.safeParse(college)
    const parsedcaptain = captainSchema.safeParse(captaindetails)
    if (!parsedcaptain.success || !parsedcollege.success) {
      res.json({
        "error":"pls enter full info"
      })
      return
    }

    const team = new SportsTeam(data);
    const saved = await team.save();
    res.send(saved);

  } catch (error) {
    res.send(error)
  }

})


app.listen(process.env.PORT|| 3000, () => {
  console.log(`started on ${process.env.PORT}`)
})