module.exports = (sequelize, DataTypes) => {
    const respondentOptions = sequelize.define('respondent_options', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        answer:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        type: DataTypes.INTEGER
    })

    respondentOptions.associate = (models) => {
        respondentOptions.belongsTo(models.question)
    }
    return respondentOptions
}
/*
  states: {
    type:   Sequelize.ENUM,
    values: ['active', 'pending', 'deleted']
  }
*/