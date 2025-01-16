-- Table: public.pokemon
--This is the table created in PostGres Database
-- DROP TABLE IF EXISTS public.pokemon;

CREATE TABLE IF NOT EXISTS public.pokemon
(
    id integer NOT NULL DEFAULT nextval('pokemon_id_seq'::regclass),
    image text COLLATE pg_catalog."default" NOT NULL,
    height integer NOT NULL,
    weight integer NOT NULL,
    hp integer NOT NULL,
    attack integer NOT NULL,
    defense integer NOT NULL,
    special_attack integer NOT NULL,
    special_defense integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pokemon_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pokemon
    OWNER to postgres;
