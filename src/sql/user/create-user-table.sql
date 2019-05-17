CREATE TABLE IF NOT EXISTS ${table~} (
  id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  updated_at timestamp NOT NULL DEFAULT current_timestamp,
  deleted boolean DEFAULT false
);