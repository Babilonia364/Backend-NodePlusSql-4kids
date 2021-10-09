class Tables {
  init(connection) {
    this.connection = connection;

    this.createServices();
    this.createPets();
  }

  createServices() {
    const query = `CREATE TABLE IF NOT EXISTS Services (
      id SERIAL NOT NULL,
      client varchar(50) NOT NULL,
      pet varchar(20),
      service varchar(20),
      date timestamp NOT NULL,
      date_created timestamp NOT NULL,
      status varchar(20) NOT NULL,
      observations text,
      PRIMARY KEY(id)
    );
    `;

    this.connection.query(query, error => {
      if (error) {
        console.log(error);
      } else {
        console.log("Services table sucessfully created");
      }
    })
  };

  createPets() {
    const query = `CREATE TABLE IF NOT EXISTS Pets (
      id SERIAL NOT NULL,
      name varchar(50) NOT NULL,
      image varchar(200) NOT NULL,
      PRIMARY KEY(id)
    );`

    this.connection.query(query, error => {
      if (error) {
        console.log(error);
      } else {
        console.log("Pet table sucessfully created");
      }
    });
  };
};

module.exports = new Tables;