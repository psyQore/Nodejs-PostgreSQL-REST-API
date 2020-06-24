const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "",
  database: "firstapi",
  port: "5432",
});

const getUsers = async (req, res) => {
  // Consulta postgresql
  const response = await pool.query("SELECT * FROM users");
  //console.log(response.rows); Para probar si funciona
  res.json(response.rows);
};

const getUserById = async (req, res) => {
  //res.send('User ID: ' + req.params.id);
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows);
  //console.log(response.rows);
};

const createUser = async (req, res) => {
  // req.body contiene los datos que le mandemos en formato json
  // console.log(req.body); para ver si funciona
  const { name, email } = req.body;

  const response = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email]
  );
  console.log(response);
  res.json({
    message: "User Added Succesfully",
    body: {
      user: { name, email },
    },
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  // console.log(id, name, email); Prueba
  const response = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id]
  );
  console.log(response);
  res.json("User updates successfully");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  //console.log(response);
  res.json(`User ${id} deleted successfully`);
  // res.send("User deleted: " + req.params.id); Prueba para testear si funciona
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
