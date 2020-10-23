--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2020-10-23 20:23:54 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16395)
-- Name: filmovi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filmovi (
    naziv_filma character varying(30) NOT NULL,
    wikipedia character varying(100) NOT NULL,
    redatelj_ime character varying(30) NOT NULL,
    redatelj_prezime character varying(30) NOT NULL,
    glumac_ime character varying(30) NOT NULL,
    glumac_prezime character varying(30) NOT NULL,
    godina integer NOT NULL,
    filmski_studio character varying(40) NOT NULL,
    trajanje_min integer NOT NULL,
    zemlja character varying(50) NOT NULL,
    zanr character varying(30) NOT NULL,
    "Box_office_zarada (m$)" integer NOT NULL
);


ALTER TABLE public.filmovi OWNER TO postgres;

--
-- TOC entry 3245 (class 0 OID 16395)
-- Dependencies: 200
-- Data for Name: filmovi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filmovi (naziv_filma, wikipedia, redatelj_ime, redatelj_prezime, glumac_ime, glumac_prezime, godina, filmski_studio, trajanje_min, zemlja, zanr, "Box_office_zarada (m$)") FROM stdin;
Genijalni um	https://en.wikipedia.org/wiki/A_Beautiful_Mind_(film)	Ron	Howard	Russell	Crowe	2001	Universal Pictures	135	Sjedinjene Američke Države	Drama	313
Genijalni um	https://en.wikipedia.org/wiki/A_Beautiful_Mind_(film)	Ron	Howard	Jennifer	Connelly	2001	Universal Pictures	135	Sjedinjene Američke Države	Drama	313
Vuk s Wall Streeta	https://en.wikipedia.org/wiki/The_Wolf_of_Wall_Street_(2013_film)	Martin	Scorsese	Leonardo	DiCaprio	2013	Universal Pictures	179	Sjedinjene Američke Države	Komedija	392
Vuk s Wall Streeta	https://en.wikipedia.org/wiki/The_Wolf_of_Wall_Street_(2013_film)	Martin	Scorsese	Jonah	Hill	2013	Universal Pictures	179	Sjedinjene Američke Države	Komedija	392
Vuk s Wall Streeta	https://en.wikipedia.org/wiki/The_Wolf_of_Wall_Street_(2013_film)	Martin	Scorsese	Margot	Robbie	2013	Universal Pictures	179	Sjedinjene Američke Države	Komedija	392
Nemilosrdni gadovi	https://en.wikipedia.org/wiki/Inglourious_Basterds	Quentin	Tarantino	Brad	Pitt	2009	The Weinstein Company	153	Sjedinjene Američke Države	Ratni	321
Nemilosrdni gadovi	https://en.wikipedia.org/wiki/Inglourious_Basterds	Quentin	Tarantino	Christoph	Waltz	2009	The Weinstein Company	153	Sjedinjene Američke Države	Ratni	321
Nemilosrdni gadovi	https://en.wikipedia.org/wiki/Inglourious_Basterds	Quentin	Tarantino	Michael	Fassbender	2009	The Weinstein Company	153	Sjedinjene Američke Države	Ratni	321
Kum	https://en.wikipedia.org/wiki/The_Godfather	Francis Ford	Coppola	Marlon	Brando	1972	Paramount Pictures	177	Sjedinjene Američke Države	Krimi	260
Kum	https://en.wikipedia.org/wiki/The_Godfather	Francis Ford	Coppola	Al	Pacino	1972	Paramount Pictures	177	Sjedinjene Američke Države	Krimi	260
Sherlock Holmes	https://en.wikipedia.org/wiki/Sherlock_Holmes_(2009_film)	Guy	Ritchie	Robert Jr.	Downey	2009	Warner Bros. Pictures	129	Ujedinjeno Kraljevstvo	Akcija	524
Sherlock Holmes	https://en.wikipedia.org/wiki/Sherlock_Holmes_(2009_film)	Guy	Ritchie	Jude	Law	2009	Warner Bros. Pictures	129	Ujedinjeno Kraljevstvo	Akcija	524
Američki psiho	https://en.wikipedia.org/wiki/American_Psycho_(film)	Mary	Harron	Christian	Bale	2000	Lions Gate Films	101	Kanada	Triler	34
Američki psiho	https://en.wikipedia.org/wiki/American_Psycho_(film)	Mary	Harron	Willem	Dafoe	2000	Lions Gate Films	101	Kanada	Triler	34
Rambo	https://en.wikipedia.org/wiki/First_Blood	Ted	Kotcheff	Sylvester	Stallone	1982	Orion Pictures	93	Sjedinjene Američke Države	Akcija	125
Rambo	https://en.wikipedia.org/wiki/First_Blood	Ted	Kotcheff	Richard	Crenna	1982	Orion Pictures	93	Sjedinjene Američke Države	Akcija	125
Kad jaganjci utihnu	https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(film)	Jonathan	Demme	Jodie	Foster	1991	Orion Pictures	118	Sjedinjene Američke Države	Horor	273
Kad jaganjci utihnu	https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(film)	Jonathan	Demme	Anthony	Hopkins	1991	Orion Pictures	118	Sjedinjene Američke Države	Horor	273
Matrix	https://en.wikipedia.org/wiki/The_Matrix	Lana	Wachowski	Keanu	Reeves	1999	Warner Bros.	136	Sjedinjene Američke Države	Znanstvena-fantastika	465
Matrix	https://en.wikipedia.org/wiki/The_Matrix	Lana	Wachowski	Laurence	Fishburne	1999	Warner Bros.	136	Sjedinjene Američke Države	Znanstvena-fantastika	465
Interstellar	https://en.wikipedia.org/wiki/Interstellar_(film)	Christoper	Nolan	Matthew	McConaughey	2014	Paramount Pictures	169	Sjedinjene Američke Države	Znanstvena-fantastika	696
Interstellar	https://en.wikipedia.org/wiki/Interstellar_(film)	Christoper	Nolan	Anne	Hathaway	2014	Paramount Pictures	169	Sjedinjene Američke Države	Znanstvena-fantastika	696
\.


-- Completed on 2020-10-23 20:23:55 CEST

--
-- PostgreSQL database dump complete
--

