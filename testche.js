import mysql from 'mysql2/promise';

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'rnksg-94-156-23-153.a.free.pinggy.link',
      port: 45593,
      user: 'root',
      password: 'mangasarkon',
      database: 'city_directory',
    });

    console.log('Connected to the database!');
    const [rows] = await connection.execute('SHOW TABLES;');
    console.log('Tables:', rows);

    await connection.end();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
