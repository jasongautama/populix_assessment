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
        type: {
            type: DataTypes.ENUM,
            values: ['MAYSELECT', 'MUSTSELECT', 'TERMINATEIFSELECT']
        }
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