CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    episodes VARCHAR(255)[] NOT NULL,
    planet VARCHAR(255)
);

INSERT INTO characters (id, name, episodes, planet) VALUES
    (1, 'Luke Skywalker', ARRAY['NEWHOPE', 'EMPIRE', 'JEDI'], NULL),
    (2, 'Darth Vader', ARRAY['NEWHOPE', 'EMPIRE', 'JEDI'], NULL),
    (3, 'Han Solo', ARRAY['NEWHOPE', 'EMPIRE', 'JEDI'], NULL),
    (4, 'Leia Organa', ARRAY['NEWHOPE', 'EMPIRE', 'JEDI'], 'Alderaan'),
    (5, 'Wilhuff Tarkin', ARRAY['NEWHOPE'], NULL),
    (6, 'C-3PO', ARRAY['NEWHOPE', 'EMPIRE', 'JEDI'], NULL),
    (7, 'R2-D2', ARRAY['NEWHOPE', 'EMPIRE', 'JEDI'], NULL);

SELECT setval('characters_id_seq', (SELECT MAX(id) FROM characters));

/*
CONSIDERATIONS:
In a real-world app, EPISODES and PLANETS could be separate tables.
Here, I've kept things simple to avoid complicating queries in the API code, as I didn't want to spend too much time on this.
Below is an example of how it could be structured.


CREATE TABLE episodes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    episode_number INTEGER NOT NULL
);

INSERT INTO episodes (title, release_date, episode_number) VALUES
    ('A New Hope', '1977-05-25', 4),
    ('The Empire Strikes Back', '1980-05-21', 5),
    ('Return of the Jedi', '1983-05-25', 6),
    ('The Phantom Menace', '1999-05-19', 1),
    ('Attack of the Clones', '2002-05-16', 2),
    ('Revenge of the Sith', '2005-05-19', 3);

CREATE TABLE planets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO planets (name) VALUES
    ('Tatooine'),
    ('Alderaan'),
    ('Yavin IV'),
    ('Hoth'),
    ('Dagobah'),
    ('Bespin'),
    ('Endor'),
    ('Naboo'),
    ('Coruscant'),
    ('Kamino');

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    planet_id INTEGER REFERENCES planets(id)
);

INSERT INTO characters (id, name, planet_id) VALUES
    (1, 'Luke Skywalker', NULL),
    (2, 'Darth Vader', NULL),
    (3, 'Han Solo', NULL),
    (4, 'Leia Organa', 2),
    (5, 'Wilhuff Tarkin', NULL),
    (6, 'C-3PO', NULL),
    (7, 'R2-D2', NULL);


CREATE TABLE character_episodes (
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
    PRIMARY KEY (character_id, episode_id)
);

INSERT INTO character_episodes (character_id, episode_id) VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 2), (2, 3),  
    (3, 1), (3, 2), (3, 3),
    (4, 1), (4, 2), (4, 3),
    (5, 1),
    (6, 1), (6, 2), (6, 3),  
    (7, 1), (7, 2), (7, 3);

SELECT setval('episodes_id_seq', (SELECT MAX(id) FROM episodes));
SELECT setval('planets_id_seq', (SELECT MAX(id) FROM planets));
SELECT setval('characters_id_seq', (SELECT MAX(id) FROM characters));

*/