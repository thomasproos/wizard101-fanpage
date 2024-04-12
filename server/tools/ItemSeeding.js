const Model = require('../database/database.js');
const fileReader = require('./FileReader.js');

async function ItemSeeding() {
  try {
    const hatItems = await fileReader('./data/HatItems.json');
    const jsonItems = JSON.parse(hatItems);

    // Submit to the database
    await Model.HatModel.insertMany(jsonItems);
  } catch(error) {
    console.log(error);
  }
  process.exit();
}

(async () => {
  await ItemSeeding();
})();