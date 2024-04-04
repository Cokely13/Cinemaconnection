// 'use strict';

// const fs = require('fs');
// const csv = require('csv-parser');
// const { db, models: { Actor, Movie, User } } = require('../server/db');

// async function seed() {
//   await db.sync({ force: true }); // Clears db and matches models to tables
//   console.log('db synced!');

//   // Moved CSV reading logic here
//   const results = await new Promise((resolve, reject) => {
//     const results = [];
//     fs.createReadStream('script/list.csv') // Ensure correct path
//       .pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', () => {
//         resolve(results);
//       })
//       .on('error', reject);
//   });

//   // Process results after CSV read is complete
//   for (const result of results) {
//     const actorName = result.Actor;
//     let actor = await Actor.findOne({ where: { name: actorName } });

//     if (!actor) {
//       actor = await Actor.create({ name: actorName });
//     }

//     // Update actor image path if available
//     const imagePath = result.Images;
//     console.log('Actor:', actorName, 'Image Path:', imagePath); // Add this line for debugging
//     if (imagePath) {
//       await Actor.update({ imagePath }, { where: { name: actorName } });
//     }

//     // Split movies by newline and add them to the Movie table
//     const movies = result.Movies.split('\n');
//     for (const movie of movies) {
//       const movieName = movie.trim();
//       await Movie.create({ name: movieName, actorId: actor.id });
//     }
//   }

//   console.log(`Seeded successfully`);
// }

// async function runSeed() {
//   console.log('Seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('Closing db connection')
//     await db.close()
//     console.log('Db connection closed')
//   }
// }

// if (module === require.main) {
//   runSeed()
// }

// module.exports = seed;

// 'use strict';

// const fs = require('fs');
// const csv = require('csv-parser');
// const { db, models: { Actor, Movie } } = require('../server/db');

// async function seed() {
//   await db.sync({ force: true }); // Clears db and matches models to tables
//   console.log('db synced!');

//   // Read actors' images from images.csv

//   // Read actors and movies from list.csv
//   const results = await new Promise((resolve, reject) => {
//     const results = [];
//     fs.createReadStream('script/list.csv') // Ensure correct path
//       .pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', () => {
//         resolve(results);
//       })
//       .on('error', reject);
//   });

//   // Process results after CSV read is complete
//   for (const result of results) {
//     const actorName = result.Actor;
//     let actor = await Actor.findOne({ where: { name: actorName } });

//     if (!actor) {
//       actor = await Actor.create({ name: actorName });
//     }

//     // Split movies by newline and add them to the Movie table
//     const movies = result.Movies.split('\n');
//     for (const movie of movies) {
//       const movieName = movie.trim();
//       await Movie.create({ name: movieName, actorId: actor.id });
//     }
//   }

//   const imageResults = await new Promise((resolve, reject) => {
//     const results = [];
//     fs.createReadStream('script/images.csv')
//       .pipe(csv())
//       .on('data', (data) => results.push(data))
//       .on('end', () => {
//         resolve(results);
//       })
//       .on('error', reject);
//   });

//   // Process results after CSV read is complete
//   for (const result of imageResults) {
//     const actorName = result.Actor;
//     const imagePath = result.Images;

//     // Find the actor by name and update the image path
//     await Actor.update({ imagePath }, { where: { name: actorName } });
//   }

//   console.log(`Seeded successfully`);
// }

// async function runSeed() {
//   console.log('Seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('Closing db connection')
//     await db.close()
//     console.log('Db connection closed')
//   }
// }

// if (module === require.main) {
//   runSeed()
// }

// module.exports = seed;

'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const { db, models: { Actor, Movie } } = require('../server/db');

async function seed() {
  await db.sync({ force: true }); // Clears db and matches models to tables
  console.log('db synced!');

  // Read actors and movies from cleaned.csv
  const results = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('script/fixed.csv') // Ensure correct path
      .pipe(csv({
        mapHeaders: ({ header, index }) => index === 0 ? 'actor' : 'movie',
      }))
      .on('data', (data) => results.push([data.actor, data.movie]))
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });

  // Process results after CSV read is complete
  for (const result of results) {
    const [actorName, movieName] = result;
    let actor = await Actor.findOne({ where: { name: actorName } });

    if (!actor) {
      actor = await Actor.create({ name: actorName });
    }

    await Movie.create({ name: movieName, actorId: actor.id });
  }

    const imageResults = await new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('script/images.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', reject);
  });

  // Process results after CSV read is complete
  for (const result of imageResults) {
    const actorName = result.Actor;
    const imagePath = result.Images;

    // Find the actor by name and update the image path
    await Actor.update({ imagePath }, { where: { name: actorName } });
  }

  console.log(`Seeded successfully`);
}

async function runSeed() {
  console.log('Seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('Closing db connection')
    await db.close()
    console.log('Db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed;
