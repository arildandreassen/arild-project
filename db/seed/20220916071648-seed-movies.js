const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
// const query = require('./20220916071648-seed-movies.sql')

const fileName = '/movies_metadata.csv'
// const fileName = '/m.csv'
// const fileName = '/s.csv'

let stream = fs.createReadStream(__dirname + fileName);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    let pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "password",
        port: 5432,
      });

    // const query =
    //   `
    //   INSERT INTO movies
    //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)

    //   `;

    const query = 
    `
    call insertData($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
    `

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          pool.query(query,row, (err, res) => {
            if (err) {
              console.log(err.stack)
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);