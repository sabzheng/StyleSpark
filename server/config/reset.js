import { pool } from './database.js';
import './dotenv.js'

import itemData from '../data/items.js';


const createTableQuery = async () =>{ 
    const createTableQuery =`
    DROP TABLE IF EXISTS items;
    CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        style VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        price VARCHAR(10) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    );
`

    try{
        const res = await pool.query(createTableQuery);
        console.log('Table created successfully!');

    }catch{
        console.log('Table creation failed!');
    }
 }

 const seedTableQuery = async () => {
    await createTableQuery()
    itemData.forEach(async (item) => {
        const insertQuery = `
            INSERT INTO items (category, style, brand, price, image, description, submittedBy, submittedOn)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        const values = [item.category, item.style, item.brand, item.price, item.image, item.description, item.submittedBy, item.submittedOn]
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error(err)
                return
            } else {
                console.log(`ITEM ${item.category}-${item.style}-${item.brand}-${item.submittedBy}-${item.submittedOn} added to table!`)
            }
        })
    })
}

seedTableQuery()