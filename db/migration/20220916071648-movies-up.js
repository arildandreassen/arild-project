const db = require("../connection");
db.query(
  `
create table movies (
  adult boolean,
  belongs_to_collection varchar(1000),
  budget float,
  genres varchar(1000),
  homepage varchar(1000),
  id int,
  imdb_id varchar(32),
  original_language varchar(3),
  original_title varchar(1000),
  overview varchar(1000),
  popularity float,
  poster_path varchar(1000),
  production_companies varchar(1000),
  production_countries varchar(1000),
  release_date varchar(32),
  release_year varchar(4),
  revenue float,
  runtime float,
  spoken_languages varchar(1000),
  status varchar(64),
  tagline varchar(1000),
  title varchar(1000),
  video boolean,
  vote_average float,
  vote_count float
)
  `
).then(() => {
  db.query(
    `
    create index movies_year on movies (release_year)
    `
  )
  db.query(
    `
    create procedure insertData(
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
      _vote_count float)
    language  sql
    as $$
      insert into movies
      values(_adult, _belongs_to_collection,_budget,_genres,_homepage,_id,_imdb_id,_original_language,_original_title,_overview,_popularity,_poster_path,_production_companies,_production_countries,_release_date, substring(_release_date from 1 for 4),_revenue,_runtime,_spoken_languages,_status,_tagline,_title,_video,_vote_average,_vote_count);
    $$;
    `
  )
})

