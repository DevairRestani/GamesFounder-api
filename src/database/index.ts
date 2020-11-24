import { createConnection } from "typeorm";

createConnection();

// docker run --name GamesFounderDB -e POSTGRES_PASSWORD=102155545Ab. -p 5432:5432 -d postgres
// yarn typeorm-model-generator -h localhost -d GamesFounderDB -u postgres -x 102155545Ab. -e postgres -o ./src/models/ -s public
