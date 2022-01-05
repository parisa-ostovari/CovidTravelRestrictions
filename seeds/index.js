const sequelize = require('../config/connection');
const seedCountry = require('./countryData');

const seedAll = async () => {
    await sequelize.sync ({force: true});
    await seedCountry();
    process.exit(0);
};

seedAll();
