// Make a proxy for intercept change and add a UPDATE request to the Database Worker Queue
var Sequelize = require('sequelize');
var DataTypes = Sequelize.DataTypes;
module.exports = function(sequelize) {
    return sequelize.define('user', {
        // autoIncrement can be used to create auto_incrementing integer columns
        nid: { type: Sequelize.BIGINT, unique: true, autoIncrement: true },
    
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
          },
        username: { type: Sequelize.STRING, allowNull: false , unique: true },
        email: { type: Sequelize.STRING, allowNull: false, unique: true },
        password: { type: Sequelize.STRING, allowNull: false },
    
        authTokens: { type: Sequelize.TEXT,
            get: function () {
                 return JSON.parse(this.getDataValue('value'));
             },
             set: function (value) {
                 this.setDataValue('value', JSON.stringify(value));
             },
        },
        infos: { type: Sequelize.TEXT,
            get: function () {
                 return JSON.parse(this.getDataValue('value'));
             },
             set: function (value) {
                 this.setDataValue('value', JSON.stringify(value));
             },
        },
       
        creationDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    }, {
        timestamps: true,
        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,
        // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
        // to the model and throw an OptimisticLockingError error when stale instances are saved.
        // Set to true or a string with the attribute name you want to use to enable.
        version: true
    })
}