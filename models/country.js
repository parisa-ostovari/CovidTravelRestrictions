const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Country extends Model {}

Country.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        countryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        countryCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        diseaseRisk: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entryText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        entryDate: {
            type:DataTypes.STRING,
            allowNull: false
        },
        docText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        docDate: {
            type:DataTypes.STRING,
            allowNull: false
        },
        isDocReq: {
            type:DataTypes.STRING
        },
        countryDocLink: {
            type:DataTypes.STRING,
            allowNull: false
        },
        maskText: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        maskDate: {
            type:DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'country' 
    }
   
    );

module.exports = Country;