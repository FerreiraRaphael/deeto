const PORT = process.env.PORT || 3000;
const DB_URL =
  "mongodb://deeto:UfgDeeto123@raphaelferreira-shard-00-00-kjo3n.mongodb.net:27017,raphaelferreira-shard-00-01-kjo3n.mongodb.net:27017,raphaelferreira-shard-00-02-kjo3n.mongodb.net:27017/deeto?ssl=true&replicaSet=RaphaelFerreira-shard-0&authSource=admin";
const SECRET = "RAPHAELFERREIRA";

export default {
  DB_URL,
  SECRET,
  PORT
};
