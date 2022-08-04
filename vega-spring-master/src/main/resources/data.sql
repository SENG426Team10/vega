-- First User admin/pass
-- database root/pass
INSERT INTO users (username, password, enabled) values
    ('admin@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('paulaguilar@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('jonoliver@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('claudinezhang@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('lovelinkumar@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('michelkouame@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('angelinacosta@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('brijeshgupta@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('amyfofana@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a',1),
    ('testuser@venus.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 1);

INSERT INTO authorities (username, authority) values
    ('admin@venus.com', 'ROLE_ADMIN'),
    ('paulaguilar@venus.com', 'ROLE_STAFF'),
    ('jonoliver@venus.com', 'ROLE_STAFF'),
    ('claudinezhang@venus.com', 'ROLE_STAFF'),
    ('lovelinkumar@venus.com', 'ROLE_STAFF'),
    ('michelkouame@venus.com', 'ROLE_STAFF'),
    ('angelinacosta@venus.com', 'ROLE_STAFF'),
    ('brijeshgupta@venus.com', 'ROLE_STAFF'),
    ('amyfofana@venus.com', 'ROLE_STAFF'),
    ('testuser@venus.com', 'ROLE_USER');



INSERT INTO userinfo (username, firstname, lastname) values
    ('admin@venus.com', 'admin' , 'admin'),
    ('paulaguilar@venus.com', 'Paul', 'Aguilar'),
    ('jonoliver@venus.com', 'Jon', 'Oliver'),
    ('claudinezhang@venus.com', 'Claudine', 'Zhang'),
    ('lovelinkumar@venus.com', 'Lovelin', 'Kumar'),
    ('michelkouame@venus.com', 'Michel', 'Kouame'),
    ('angelinacosta@venus.com', 'Angelina', 'Costa'),
    ('brijeshgupta@venus.com', 'Brijesh', 'Gupta'),
    ('amyfofana@venus.com', 'Amy', 'Fofana'),
    ('testuser@venus.com', 'testuser', 'testuser');

INSERT INTO secrets (username, secretname, createddate, secretdata) values
    ('admin@venus.com', '1', '01/01/1999', '1'),
    ('paulaguilar@venus.com', '2', '01/01/1999', '2'),
    ('jonoliver@venus.com', '3', '01/01/1999', '3'),
    ('claudinezhang@venus.com', '4', '01/01/1999', '4'),
    ('lovelinkumar@venus.com', '5', '01/01/1999', '5'),
    ('michelkouame@venus.com', '6', '01/01/1999', '6'),
    ('angelinacosta@venus.com', '7', '01/01/1999', '7'),
    ('brijeshgupta@venus.com', '8', '01/01/1999', '8'),
    ('amyfofana@venus.com', '9', '01/01/1999', '9'),
    ('testuser@venus.com', '10', '01/01/1999', '10');