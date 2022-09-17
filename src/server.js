const { PORT = 5001 } = process.env;

const app = require("./app");

// knex.migrate
//   .latest()
//   .then((migrations) => {
//     console.log("migrations", migrations);
//     app.listen(PORT, listener);
//   })
//   .catch((error) => {
//     console.error(error);
//     knex.destroy();
//   });

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
});
