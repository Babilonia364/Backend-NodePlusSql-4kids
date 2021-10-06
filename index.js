const customExpress = require('./config/customExpress');
const connection = require('./database/connection');
const Tables = require('./database/tables');

connection.connect(erro => {
  console.log("test");
  if (erro) {
    console.log("failed to connect to database: ", erro);
  } else {
    console.log("successfully connected to database");
    Tables.init(connection);

    const app = customExpress();

    app.listen(3000, () => console.log("Server on and listen on port 3000"));
  }
});