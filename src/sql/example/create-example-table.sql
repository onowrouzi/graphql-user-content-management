CREATE TABLE IF NOT EXISTS example (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
    name varchar(50),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp,
    deleted boolean
);