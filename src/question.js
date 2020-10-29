module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        question: DataTypes.STRING,
    })

    Question.associate = (models) => {
        Question.hasMany(models.respondent_options)
    }
    return Question
}