'use strict'

const fs = require('fs');
const csv = require('csv-parser');
const { db, models: { Quarterback, Receiver, User } } = require('../server/db');

async function seed() {
  await db.sync({ force: true }); // Clears db and matches models to tables
  console.log('db synced!');

  // Moved CSV reading logic here
  const results = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('script/data.csv') // Ensure correct path
      .pipe(csv({
        mapHeaders: ({ header, index }) => index === 0 ? 'receiver' : 'quarterback',
      }))
      .on('data', (data) => results.push([data.receiver, data.quarterback]))
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });

  // Process results after CSV read is complete
  for (const result of results) {
    const [receiverName, qbName] = result;
    let qb = await Quarterback.findOne({ where: { name: qbName } });

    if (!qb) {
      qb = await Quarterback.create({ name: qbName });
    }

    await Receiver.create({ name: receiverName, quarterbackId: qb.id });
  }

  // Your users creation logic remains the same
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

  // const qbsAndReceivers = await readQBsAndReceivers();


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
