# `sequelize-store`

## Description
A simple example of how to use the connect-session-sequelize module. The underlying DB is postgres and Docker is 
used to implement this solution.

A dependency upon 
- [pg-hstore](https://www.npmjs.com/package/pg-hstore) 
- [pg](https://www.npmjs.com/package/pg)

will be created using postgres.

the following is executed to create the session table

```sql
CREATE TABLE IF NOT EXISTS "Session" ("sid" VARCHAR(36) , "expires" TIMESTAMP WITH TIME ZONE, "data" TEXT, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("sid"));
```
