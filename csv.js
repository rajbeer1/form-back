import { MongoClient } from 'mongodb';
import { createObjectCsvWriter } from 'csv-writer';
import { spawn } from 'child_process';
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.uri;
const dbName = 'test';

function runMongoExport() {
  const exportCommand = spawn('mongoexport', [
    '--uri',
    uri,
    '--collection',
    'sportsteams',
    '--type=csv',
    '--fields',
    '_id,sport,college.name,college.location,captain.name,captain.rollNumber,captain.phoneNumber,captain.age,captain.emailId,captain.paymentString',
    '--out',
    'data.csv',
  ]);

  exportCommand.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  exportCommand.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  exportCommand.on('close', (code) => {
    console.log(`mongoexport process exited with code ${code}`);
  });
}

const csvWriter = createObjectCsvWriter({
  path: 'players.csv',
  header: [
    { id: 'teamId', title: 'TEAM_ID' },
    { id: 'name', title: 'NAME' },
    { id: 'rollNumber', title: 'ROLL_NUMBER' },
    { id: 'phoneNumber', title: 'PHONE_NUMBER' },
    { id: 'age', title: 'AGE' },
  ],
});

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database');
    const db = client.db(dbName);
    const collection = db.collection('sportsteams');

    collection
      .find({})
      .toArray()
      .then((docs) => {
        const playerData = [];

        docs.forEach((doc) => {
          doc.players.forEach((player) => {
            playerData.push({
              teamId: doc._id.toString(), // Convert ObjectId to string
              name: player.name,
              rollNumber: player.rollNumber,
              phoneNumber: player.phoneNumber,
              age: player.age,
            });
          });
        });

        return csvWriter.writeRecords(playerData);
      })
      .then(() => {
        console.log('Player CSV file was written successfully');
        runMongoExport(); // Run mongoexport after writing player CSV
        client.close();
      })
      .catch((err) => {
        console.error('Error writing CSV:', err);
        client.close();
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


  mongoexport --uri=mongodb+srv://royu49:rajbeer11@cluster0.swzg33t.mongodb.net/test --collection=sportsteams --type=csv --fields=_id,sport,college.name,college.location,captain.name,captain.rollNumber,captain.phoneNumber,captain.age,captain.emailId,captain.paymentString,players --out=data.csv