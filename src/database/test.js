const Database = require('./Database');
async function testDatabase() {
    try {
        const db = Database;

        await db.connect();

        const result = await db.query('SELECT 1 + 1 AS solution');
        console.log('Resultado da query:', result[0].solution);
        await db.close();

    } catch (error) {
        console.error('Nao deu bao:', error);
    }
}
testDatabase();