const { dataBase } = require(__dir.libs + "/dataBase");

const registration = async ({
    fullName, email, password, rank, position
}) => {
    console.log('debug',)
    try {
        await dataBase("Teacher").insert({
            fullName, email, password, rank, position
        });
    } catch (error) {
        console.error('Error adding teacher:', error)
        throw error
    }
};

module.exports = {
    registration,
};