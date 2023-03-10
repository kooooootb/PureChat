CREATE TABLE IF NOT EXISTS purechat(
    message text NOT NULL,
    message_date timestamp NOT NULL DEFAULT(now() AT TIME ZONE 'UTC'),
    message_id bigint PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY(INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1)
);