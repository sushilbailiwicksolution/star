const { Pool } = require('pg')

const db_username = 'postgres'
const db_password = 'Admin@321'
const db_host     = '127.0.0.1'
const db_port     = 5432
const db_name     = 'stardb'

    
const pool = new Pool({
    user: db_username,
    host: db_host, 
    database: db_name,
    password: db_password,
    port: db_port
})

;(async () => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
    const res = await client.query(queryText, ['brianc'])
    console.log('1', 'Data inserted into users')
    const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
    const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
    await client.query(insertPhotoText, insertPhotoValues)
    console.log('2', 'Data inserted into photos')
    await client.query('COMMIT')
    console.log('3', 'Data committed')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
    console.log('4','Client released')
  }
})().catch(e => console.error(e.stack))
