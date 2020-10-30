module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        question: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })

    Question.associate = (models) => {
        Question.hasMany(models.respondent_options)
    }
    return Question
}