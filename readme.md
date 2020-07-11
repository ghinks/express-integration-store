# Testing tool for express session connect modules

## Description
This mono repo allows the testing of the various express-session connect modules that are in the public registry. The
majority of the connect modules persist to some sort of DB that can be shared with amongst various instances of the nodejs
servers so that load balancing is possible. For all but the most trival systems testing is achieved using Docker based 
services.

## modules targeted
The following connect modules are to be tested with the priority being given to those with the highest downloads.

| name | downloads (1000s) | local test package |
|------------------------|------|------|
| [connect-redis](https://www.npmjs.com/package/connect-redis) | 220 | redis-store |
| [connect-mongo](https://www.npmjs.com/package/connect-mongo) | 81 | mongo-store |
| [memorystore](https://www.npmjs.com/package/memorystore) | 41 | lru-memory-store |
| [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) | 31 | sequelize-store |
| [session-file-store](https://www.npmjs.com/package/session-file-store) | 18 |
| [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple) | 15 | pg-simple-store |
| [express-mysql-session](https://www.npmjs.com/package/express-mysql-session) | 12 |
| [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session) | 10 |
| [connect-session-knex](https://www.npmjs.com/package/connect-session-knex) | 7 |
| [connect-dynamodb](https://www.npmjs.com/package/connect-dynamodb) | 4 |
| [express-nedb-session](https://www.npmjs.com/package/express-nedb-session) | 3 |
| [connect-memcached](https://www.npmjs.com/package/connect-memcached) | 3 |
| [firestore-store](https://www.npmjs.com/package/firestore-store) | 2 |
| [@google-cloud/connect-firestore](https://www.npmjs.com/package/@google-cloud/connect-firestore) | 1 |
| [@google-cloud/connect-datastore](https://www.npmjs.com/package/@google-cloud/connect-datastore) | 1 |
| [connect-session-firebase](https://www.npmjs.com/package/connect-session-firebase) | 1 |

