const db = require("../connection");

db.query("drop table if exists movies");
db.query(`drop procedure if exists insertData(
    _adult boolean,
    _belongs_to_collection varchar,
    _budget float,
    _genres varchar,
    _homepage varchar,
    _id int,
    _imdb_id varchar,
    _original_language varchar,
    _original_title varchar,
    _overview varchar,
    _popularity float,
    _poster_path varchar,
    _production_companies varchar,
    _production_countries varchar,
    _release_date varchar,
    _revenue float,
    _runtime float,
    _spoken_languages varchar,
    _status varchar,
    _tagline varchar,
    _title varchar,
    _video boolean,
    _vote_average float,
    _vote_count float)`)
