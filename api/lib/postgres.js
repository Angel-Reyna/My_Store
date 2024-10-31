import pg from 'pg'

async function getConnection () {
  const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin123',
    database: 'my_store'
  })
  await client.connect()
  return client
}

export { getConnection }
