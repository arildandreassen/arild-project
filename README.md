# Usage

There are 2 endpoints

`/production_companies`

`/genres`

## /production_companies:

This endpoint will return a list of all the production companies in the system
It accepts 2 query parameters:

- production_id
- year

production_id: The Id of the production company
year: The year to get the details of the production company

example usages

```
/production_companies
/production_companies?production_id=4&year=2010
```

If no companies are found, it will return `no companies found`

## /genres

This endpoint will return a list of all the genres of the movies in the system.
It accepts 2 query parameters:

- year
- onlytop=[true,false]

year: the year to get the popularity of the genres
onlytop: [true] to return only the most popular genre for the year [false] or omit to return the whole list for the year

example usages

```
/genres
/genres?year=2000&onlytop=true
```

If no movies with genres are found, it will return `no genres found`

# Setup

## requirements

- nodejs
- npm
- docker

## installation

- run `npm install` to install all the dependencies
- run `npm run local.db.up` to start the local database in a docker instance
- run `npm run migrate.up` to setup the database
- run `npm run download.seed` to download the csv files needed
- run `npm run seed` to seed the database with the required files NOTE: some of the rows included in the file might be invalid. If this is the case, the error will be printed to the console and the seeding will continue
- run `npm run start` to start the server and be ready to accept requests
