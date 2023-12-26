--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: allotment_columns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.allotment_columns (
    column_type character varying(50),
    columns character varying(50),
    column_letter character(1) NOT NULL,
    formula character varying(100)
);


ALTER TABLE public.allotment_columns OWNER TO postgres;

--
-- Name: batch; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.batch (
    batchid integer NOT NULL,
    programme character varying(30),
    department character varying(50),
    course character varying(30),
    year integer,
    semester character varying(10),
    batch_name character varying(10)
);


ALTER TABLE public.batch OWNER TO postgres;

--
-- Name: batch_batchid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.batch_batchid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.batch_batchid_seq OWNER TO postgres;

--
-- Name: batch_batchid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.batch_batchid_seq OWNED BY public.batch.batchid;


--
-- Name: certificate_application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificate_application (
    application_id integer NOT NULL,
    admission_no character varying(50),
    certificate_id integer,
    date date,
    type character varying(30),
    approved boolean,
    rejected boolean,
    status character varying(20),
    application_form character varying(5000),
    feedback character varying(500)
);


ALTER TABLE public.certificate_application OWNER TO postgres;

--
-- Name: certificate_application_application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certificate_application_application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.certificate_application_application_id_seq OWNER TO postgres;

--
-- Name: certificate_application_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certificate_application_application_id_seq OWNED BY public.certificate_application.application_id;


--
-- Name: certificates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificates (
    certificate_id integer NOT NULL,
    name character varying(100),
    template_text character varying(2000),
    application_template character varying(1000),
    pathno integer
);


ALTER TABLE public.certificates OWNER TO postgres;

--
-- Name: certificates_certificate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certificates_certificate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.certificates_certificate_id_seq OWNER TO postgres;

--
-- Name: certificates_certificate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certificates_certificate_id_seq OWNED BY public.certificates.certificate_id;


--
-- Name: complaints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaints (
    userid character varying(30) NOT NULL,
    complaint character varying(100)
);


ALTER TABLE public.complaints OWNER TO postgres;

--
-- Name: cumulativemessoutinmate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cumulativemessoutinmate (
    hostel_admission_no character varying(20),
    countpermonth integer
);


ALTER TABLE public.cumulativemessoutinmate OWNER TO postgres;

--
-- Name: entrance_exam_marks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entrance_exam_marks (
    applicationid integer NOT NULL,
    exam_type character varying(30),
    rank integer
);


ALTER TABLE public.entrance_exam_marks OWNER TO postgres;

--
-- Name: faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faculty (
    pen_no character varying(20) NOT NULL,
    designation character varying(30)
);


ALTER TABLE public.faculty OWNER TO postgres;

--
-- Name: hod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hod (
    roleid integer NOT NULL,
    department character varying(30)
);


ALTER TABLE public.hod OWNER TO postgres;

--
-- Name: hostel_application; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hostel_application (
    user_id character varying(30),
    applicationid integer NOT NULL,
    age integer,
    dob date,
    religion character varying(20),
    caste character varying(20),
    category character varying(20),
    admission_criteria character varying(20),
    parent_name character varying(30),
    parent_address character varying(200),
    parent_number character varying(15),
    local_guardian_name character varying(30),
    local_guardian_address character varying(200),
    local_guardian_number character varying(15),
    parent_occupation character varying(30),
    annual_income numeric,
    bpl boolean,
    present_address character varying(200),
    nearest_landmark character varying(50),
    eligible_for_concession boolean,
    concession_details character varying(30),
    status character varying(30),
    university_cgpa character varying(20),
    rank character varying(20)
);


ALTER TABLE public.hostel_application OWNER TO postgres;

--
-- Name: hostel_application_applicationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hostel_application_applicationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hostel_application_applicationid_seq OWNER TO postgres;

--
-- Name: hostel_application_applicationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hostel_application_applicationid_seq OWNED BY public.hostel_application.applicationid;


--
-- Name: hostel_authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hostel_authority (
    roleid integer NOT NULL,
    type character varying(30)
);


ALTER TABLE public.hostel_authority OWNER TO postgres;

--
-- Name: hostel_blocks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hostel_blocks (
    hostel character varying(30) NOT NULL,
    block_name character varying(30) NOT NULL,
    block_id integer NOT NULL
);


ALTER TABLE public.hostel_blocks OWNER TO postgres;

--
-- Name: hostel_blocks_block_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hostel_blocks_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hostel_blocks_block_id_seq OWNER TO postgres;

--
-- Name: hostel_blocks_block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hostel_blocks_block_id_seq OWNED BY public.hostel_blocks.block_id;


--
-- Name: hostel_out; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hostel_out (
    entryno integer NOT NULL,
    hostel_admission_no character varying(50),
    fromdate date,
    todate date,
    reason character varying(500)
);


ALTER TABLE public.hostel_out OWNER TO postgres;

--
-- Name: hostel_out_entryno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hostel_out_entryno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hostel_out_entryno_seq OWNER TO postgres;

--
-- Name: hostel_out_entryno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hostel_out_entryno_seq OWNED BY public.hostel_out.entryno;


--
-- Name: hostel_requirements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hostel_requirements (
    rank_rule character varying(100),
    hostel_allotment_open boolean
);


ALTER TABLE public.hostel_requirements OWNER TO postgres;

--
-- Name: hostel_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hostel_room (
    room_id integer NOT NULL,
    block_id integer,
    room_no integer,
    user_type character varying(30),
    floor_no integer,
    current_inmates integer,
    maximum_inmates integer
);


ALTER TABLE public.hostel_room OWNER TO postgres;

--
-- Name: hostel_room_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hostel_room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hostel_room_room_id_seq OWNER TO postgres;

--
-- Name: hostel_room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hostel_room_room_id_seq OWNED BY public.hostel_room.room_id;


--
-- Name: inmate_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inmate_role (
    hostel_admission_no character varying(50) NOT NULL,
    role character varying(30) NOT NULL
);


ALTER TABLE public.inmate_role OWNER TO postgres;

--
-- Name: inmate_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inmate_room (
    hostel_admission_no character varying(50) NOT NULL,
    room_id integer
);


ALTER TABLE public.inmate_room OWNER TO postgres;

--
-- Name: inmate_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inmate_table (
    admission_no character varying(50) NOT NULL,
    hostel_admission_no character varying(50)
);


ALTER TABLE public.inmate_table OWNER TO postgres;

--
-- Name: messbill; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messbill (
    hostel_admission_no character varying(50) NOT NULL,
    year character varying(30),
    month character varying(30),
    attendance integer,
    mess_charge numeric,
    extras numeric,
    feast numeric,
    lf numeric,
    af numeric,
    total numeric,
    dues numeric
);


ALTER TABLE public.messbill OWNER TO postgres;

--
-- Name: messout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messout (
    hostel_admission_no character varying(50) NOT NULL,
    fromdate date,
    todate date,
    showtodate boolean DEFAULT true,
    messout_id integer NOT NULL
);


ALTER TABLE public.messout OWNER TO postgres;

--
-- Name: messout_messout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messout_messout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messout_messout_id_seq OWNER TO postgres;

--
-- Name: messout_messout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messout_messout_id_seq OWNED BY public.messout.messout_id;


--
-- Name: messrequirements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messrequirements (
    key character varying(30) NOT NULL,
    value integer
);


ALTER TABLE public.messrequirements OWNER TO postgres;

--
-- Name: messrequirementslh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messrequirementslh (
    key character varying(50),
    value integer
);


ALTER TABLE public.messrequirementslh OWNER TO postgres;

--
-- Name: path; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.path (
    pathno integer NOT NULL,
    path character varying(50)
);


ALTER TABLE public.path OWNER TO postgres;

--
-- Name: path_pathno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.path_pathno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.path_pathno_seq OWNER TO postgres;

--
-- Name: path_pathno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.path_pathno_seq OWNED BY public.path.pathno;


--
-- Name: perdaymessexpenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perdaymessexpenses (
    id integer NOT NULL,
    bill_date date,
    bill_no bigint,
    particulars character varying(50)[],
    supplier_id integer,
    bill_amount double precision,
    hostel character varying(20),
    status integer DEFAULT 0,
    dates date[]
);


ALTER TABLE public.perdaymessexpenses OWNER TO postgres;

--
-- Name: perdaymessexpenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perdaymessexpenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.perdaymessexpenses_id_seq OWNER TO postgres;

--
-- Name: perdaymessexpenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perdaymessexpenses_id_seq OWNED BY public.perdaymessexpenses.id;


--
-- Name: rank_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rank_list (
    user_id character varying(30) NOT NULL,
    rank integer,
    verified boolean
);


ALTER TABLE public.rank_list OWNER TO postgres;

--
-- Name: roles_faculty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_faculty (
    roleid integer NOT NULL,
    userid character varying(20),
    role character varying(30)
);


ALTER TABLE public.roles_faculty OWNER TO postgres;

--
-- Name: roles_faculty_roleid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_faculty_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_faculty_roleid_seq OWNER TO postgres;

--
-- Name: roles_faculty_roleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_faculty_roleid_seq OWNED BY public.roles_faculty.roleid;


--
-- Name: room_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_request (
    hostel_admission_no character varying(50) NOT NULL,
    preferred_room character varying(10),
    reason character varying(200),
    confirmed boolean
);


ALTER TABLE public.room_request OWNER TO postgres;

--
-- Name: staff_advisor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_advisor (
    roleid integer NOT NULL,
    batchid integer
);


ALTER TABLE public.staff_advisor OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    admission_no character varying(50) NOT NULL,
    batchid integer,
    year_of_admission integer,
    address character varying(200),
    stage character varying(20)
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_progress (
    admission_no character varying(50) NOT NULL,
    semester character varying(10),
    attendance numeric,
    sessionals numeric,
    university_marks numeric,
    no_of_backpapers integer
);


ALTER TABLE public.student_progress OWNER TO postgres;

--
-- Name: supplier_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier_list (
    supplier_id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.supplier_list OWNER TO postgres;

--
-- Name: supplier_list_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supplier_list_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.supplier_list_supplier_id_seq OWNER TO postgres;

--
-- Name: supplier_list_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supplier_list_supplier_id_seq OWNED BY public.supplier_list.supplier_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id character varying(50) NOT NULL,
    password character varying(255),
    name character varying(100),
    email character varying(100),
    mobile_no character varying(20),
    designation character varying(50),
    is_admin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: batch batchid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batch ALTER COLUMN batchid SET DEFAULT nextval('public.batch_batchid_seq'::regclass);


--
-- Name: certificate_application application_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_application ALTER COLUMN application_id SET DEFAULT nextval('public.certificate_application_application_id_seq'::regclass);


--
-- Name: certificates certificate_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates ALTER COLUMN certificate_id SET DEFAULT nextval('public.certificates_certificate_id_seq'::regclass);


--
-- Name: hostel_application applicationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_application ALTER COLUMN applicationid SET DEFAULT nextval('public.hostel_application_applicationid_seq'::regclass);


--
-- Name: hostel_blocks block_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_blocks ALTER COLUMN block_id SET DEFAULT nextval('public.hostel_blocks_block_id_seq'::regclass);


--
-- Name: hostel_out entryno; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_out ALTER COLUMN entryno SET DEFAULT nextval('public.hostel_out_entryno_seq'::regclass);


--
-- Name: hostel_room room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_room ALTER COLUMN room_id SET DEFAULT nextval('public.hostel_room_room_id_seq'::regclass);


--
-- Name: messout messout_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messout ALTER COLUMN messout_id SET DEFAULT nextval('public.messout_messout_id_seq'::regclass);


--
-- Name: path pathno; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path ALTER COLUMN pathno SET DEFAULT nextval('public.path_pathno_seq'::regclass);


--
-- Name: perdaymessexpenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perdaymessexpenses ALTER COLUMN id SET DEFAULT nextval('public.perdaymessexpenses_id_seq'::regclass);


--
-- Name: roles_faculty roleid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_faculty ALTER COLUMN roleid SET DEFAULT nextval('public.roles_faculty_roleid_seq'::regclass);


--
-- Name: supplier_list supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_list ALTER COLUMN supplier_id SET DEFAULT nextval('public.supplier_list_supplier_id_seq'::regclass);


--
-- Data for Name: allotment_columns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.allotment_columns (column_type, columns, column_letter, formula) FROM stdin;
existing	hostel_application.user_id	A	
\.


--
-- Data for Name: batch; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.batch (batchid, programme, department, course, year, semester, batch_name) FROM stdin;
1	B.Tech	Computer Science and Engineering	ug	2020	s6	A
2	B.Tech	Civil Enginering	ug	2020	s6	A
\.


--
-- Data for Name: certificate_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificate_application (application_id, admission_no, certificate_id, date, type, approved, rejected, status, application_form, feedback) FROM stdin;
\.


--
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificates (certificate_id, name, template_text, application_template, pathno) FROM stdin;
\.


--
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complaints (userid, complaint) FROM stdin;
\.


--
-- Data for Name: cumulativemessoutinmate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cumulativemessoutinmate (hostel_admission_no, countpermonth) FROM stdin;
3	58
21LH121	4
\.


--
-- Data for Name: entrance_exam_marks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entrance_exam_marks (applicationid, exam_type, rank) FROM stdin;
\.


--
-- Data for Name: faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faculty (pen_no, designation) FROM stdin;
2	Doctorate
\.


--
-- Data for Name: hod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hod (roleid, department) FROM stdin;
\.


--
-- Data for Name: hostel_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hostel_application (user_id, applicationid, age, dob, religion, caste, category, admission_criteria, parent_name, parent_address, parent_number, local_guardian_name, local_guardian_address, local_guardian_number, parent_occupation, annual_income, bpl, present_address, nearest_landmark, eligible_for_concession, concession_details, status, university_cgpa, rank) FROM stdin;
\N	2	\N	2002-09-11	muslim	obc	obc	KEAM	sasa	sasa	77	sasa	sasa	787	\N	778	f	sasa	\N	f	\N	\N	9.4	67
4	1	\N	2002-09-11	muslim	obc	obc	KEAM	sasa	sasa	77	sasa	sasa	787	\N	778	f	sasa	\N	f	\N	\N	9.4	67
\.


--
-- Data for Name: hostel_authority; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hostel_authority (roleid, type) FROM stdin;
\.


--
-- Data for Name: hostel_blocks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hostel_blocks (hostel, block_name, block_id) FROM stdin;
MH	new block	1
LH	new block	2
MH	A	3
MH	B	4
MH	C	5
MH	D	6
LH	old block	7
\.


--
-- Data for Name: hostel_out; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hostel_out (entryno, hostel_admission_no, fromdate, todate, reason) FROM stdin;
\.


--
-- Data for Name: hostel_requirements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hostel_requirements (rank_rule, hostel_allotment_open) FROM stdin;
A:hostel_application.user_id:Asc	t
\.


--
-- Data for Name: hostel_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hostel_room (room_id, block_id, room_no, user_type, floor_no, current_inmates, maximum_inmates) FROM stdin;
13	3	101	\N	1	\N	\N
14	3	301	\N	3	\N	\N
15	3	201	\N	2	\N	\N
16	5	101	\N	1	\N	\N
17	5	201	\N	2	\N	\N
18	5	301	\N	3	\N	\N
19	4	201	\N	2	\N	\N
20	4	101	\N	1	\N	\N
21	6	201	\N	2	\N	\N
22	6	301	\N	3	\N	\N
23	4	301	\N	3	\N	\N
24	3	302	\N	3	\N	\N
25	3	202	\N	2	\N	\N
26	3	102	\N	1	\N	\N
27	5	102	\N	1	\N	\N
28	5	202	\N	2	\N	\N
29	6	302	\N	3	\N	\N
30	4	302	\N	3	\N	\N
31	3	303	\N	3	\N	\N
32	3	203	\N	2	\N	\N
33	3	103	\N	1	\N	\N
34	5	302	\N	3	\N	\N
35	4	202	\N	2	\N	\N
37	6	202	\N	2	\N	\N
36	4	102	\N	1	\N	\N
38	6	101	\N	1	\N	\N
39	5	103	\N	1	\N	\N
40	5	203	\N	2	\N	\N
41	6	303	\N	3	\N	\N
42	4	303	\N	3	\N	\N
43	3	304	\N	3	\N	\N
44	3	204	\N	2	\N	\N
45	3	104	\N	1	\N	\N
46	5	303	\N	3	\N	\N
47	4	203	\N	2	\N	\N
48	6	203	\N	2	\N	\N
49	6	102	\N	1	\N	\N
50	5	104	\N	1	\N	\N
51	5	204	\N	2	\N	\N
52	6	304	\N	3	\N	\N
53	4	304	\N	3	\N	\N
54	3	305	\N	3	\N	\N
55	3	205	\N	2	\N	\N
56	3	105	\N	1	\N	\N
57	4	103	\N	1	\N	\N
58	5	304	\N	3	\N	\N
59	4	204	\N	2	\N	\N
60	6	204	\N	2	\N	\N
61	6	103	\N	1	\N	\N
62	5	105	\N	1	\N	\N
63	5	205	\N	2	\N	\N
64	6	305	\N	3	\N	\N
65	4	305	\N	3	\N	\N
66	3	306	\N	3	\N	\N
67	3	206	\N	2	\N	\N
68	3	106	\N	1	\N	\N
69	4	104	\N	1	\N	\N
70	5	305	\N	3	\N	\N
71	4	205	\N	2	\N	\N
72	6	205	\N	2	\N	\N
73	6	104	\N	1	\N	\N
74	5	106	\N	1	\N	\N
75	5	206	\N	2	\N	\N
76	6	306	\N	3	\N	\N
77	4	306	\N	3	\N	\N
78	3	307	\N	3	\N	\N
79	3	207	\N	2	\N	\N
80	3	107	\N	1	\N	\N
81	4	105	\N	1	\N	\N
82	5	306	\N	3	\N	\N
83	4	206	\N	2	\N	\N
84	6	206	\N	2	\N	\N
85	6	105	\N	1	\N	\N
86	5	107	\N	1	\N	\N
87	5	207	\N	2	\N	\N
88	6	307	\N	3	\N	\N
89	4	307	\N	3	\N	\N
90	3	308	\N	3	\N	\N
91	3	208	\N	2	\N	\N
92	3	108	\N	1	\N	\N
93	4	106	\N	1	\N	\N
94	5	307	\N	3	\N	\N
95	4	207	\N	2	\N	\N
96	6	207	\N	2	\N	\N
97	6	106	\N	1	\N	\N
98	5	108	\N	1	\N	\N
99	5	208	\N	2	\N	\N
100	6	308	\N	3	\N	\N
101	4	308	\N	3	\N	\N
102	3	309	\N	3	\N	\N
103	3	209	\N	2	\N	\N
104	3	109	\N	1	\N	\N
105	4	107	\N	1	\N	\N
106	5	308	\N	3	\N	\N
107	4	208	\N	2	\N	\N
108	6	208	\N	2	\N	\N
109	6	107	\N	1	\N	\N
110	5	109	\N	1	\N	\N
111	5	209	\N	2	\N	\N
112	6	309	\N	3	\N	\N
113	4	309	\N	3	\N	\N
114	3	310	\N	3	\N	\N
115	3	210	\N	2	\N	\N
116	3	110	\N	1	\N	\N
117	4	108	\N	1	\N	\N
118	5	309	\N	3	\N	\N
119	4	209	\N	2	\N	\N
120	6	209	\N	2	\N	\N
121	6	108	\N	1	\N	\N
122	5	110	\N	1	\N	\N
123	5	210	\N	2	\N	\N
124	6	310	\N	3	\N	\N
125	4	310	\N	3	\N	\N
126	3	311	\N	3	\N	\N
127	3	211	\N	2	\N	\N
128	3	111	\N	1	\N	\N
129	4	109	\N	1	\N	\N
130	5	310	\N	3	\N	\N
131	4	210	\N	2	\N	\N
132	6	210	\N	2	\N	\N
133	6	109	\N	1	\N	\N
134	5	111	\N	1	\N	\N
135	5	211	\N	2	\N	\N
136	6	311	\N	3	\N	\N
137	4	311	\N	3	\N	\N
138	3	312	\N	3	\N	\N
139	3	212	\N	2	\N	\N
140	3	112	\N	1	\N	\N
141	4	110	\N	1	\N	\N
142	5	311	\N	3	\N	\N
143	4	211	\N	2	\N	\N
144	6	211	\N	2	\N	\N
145	6	110	\N	1	\N	\N
146	5	112	\N	1	\N	\N
147	5	212	\N	2	\N	\N
148	6	312	\N	3	\N	\N
149	4	312	\N	3	\N	\N
150	3	313	\N	3	\N	\N
151	3	213	\N	2	\N	\N
152	3	113	\N	1	\N	\N
153	4	111	\N	1	\N	\N
154	5	312	\N	3	\N	\N
155	4	212	\N	2	\N	\N
156	6	212	\N	2	\N	\N
157	6	111	\N	1	\N	\N
158	5	113	\N	1	\N	\N
159	5	213	\N	2	\N	\N
160	6	313	\N	3	\N	\N
161	4	313	\N	3	\N	\N
162	3	314	\N	3	\N	\N
163	3	214	\N	2	\N	\N
164	3	114	\N	1	\N	\N
165	4	112	\N	1	\N	\N
166	5	313	\N	3	\N	\N
167	4	213	\N	2	\N	\N
168	6	213	\N	2	\N	\N
169	6	112	\N	1	\N	\N
170	5	114	\N	1	\N	\N
171	5	214	\N	2	\N	\N
172	6	314	\N	3	\N	\N
173	4	314	\N	3	\N	\N
174	3	315	\N	3	\N	\N
175	3	215	\N	2	\N	\N
176	3	115	\N	1	\N	\N
177	4	113	\N	1	\N	\N
178	5	314	\N	3	\N	\N
179	4	214	\N	2	\N	\N
180	6	214	\N	2	\N	\N
181	6	113	\N	1	\N	\N
182	5	115	\N	1	\N	\N
1	2	0	First Year	0	1	4
183	5	215	\N	2	\N	\N
193	6	114	\N	1	\N	\N
203	4	216	\N	2	\N	\N
213	4	116	\N	1	\N	\N
223	3	219	\N	2	\N	\N
233	4	319	\N	3	\N	\N
243	5	220	\N	2	\N	\N
253	6	119	\N	1	\N	\N
262	6	120	\N	1	\N	\N
264	6	121	\N	1	\N	\N
184	6	315	\N	3	\N	\N
194	5	116	\N	1	\N	\N
204	6	216	\N	2	\N	\N
214	5	317	\N	3	\N	\N
224	3	119	\N	1	\N	\N
234	3	320	\N	3	\N	\N
244	6	320	\N	3	\N	\N
254	5	121	\N	1	\N	\N
185	4	315	\N	3	\N	\N
195	5	216	\N	2	\N	\N
205	6	115	\N	1	\N	\N
215	4	217	\N	2	\N	\N
225	4	117	\N	1	\N	\N
235	3	220	\N	2	\N	\N
245	4	320	\N	3	\N	\N
255	5	221	\N	2	\N	\N
186	3	316	\N	3	\N	\N
196	6	316	\N	3	\N	\N
206	5	117	\N	1	\N	\N
216	6	217	\N	2	\N	\N
226	5	318	\N	3	\N	\N
236	3	120	\N	1	\N	\N
246	3	321	\N	3	\N	\N
256	6	321	\N	3	\N	\N
187	3	216	\N	2	\N	\N
197	4	316	\N	3	\N	\N
207	5	217	\N	2	\N	\N
217	6	116	\N	1	\N	\N
227	4	218	\N	2	\N	\N
237	4	118	\N	1	\N	\N
247	3	221	\N	2	\N	\N
257	4	321	\N	3	\N	\N
188	3	116	\N	1	\N	\N
198	3	317	\N	3	\N	\N
208	6	317	\N	3	\N	\N
218	5	118	\N	1	\N	\N
228	6	218	\N	2	\N	\N
238	5	319	\N	3	\N	\N
248	3	121	\N	1	\N	\N
189	4	114	\N	1	\N	\N
199	3	217	\N	2	\N	\N
209	4	317	\N	3	\N	\N
219	5	218	\N	2	\N	\N
229	6	117	\N	1	\N	\N
239	4	219	\N	2	\N	\N
249	4	119	\N	1	\N	\N
258	4	120	\N	1	\N	\N
263	4	121	\N	1	\N	\N
190	5	315	\N	3	\N	\N
200	3	117	\N	1	\N	\N
210	3	318	\N	3	\N	\N
220	6	318	\N	3	\N	\N
230	5	119	\N	1	\N	\N
240	6	219	\N	2	\N	\N
250	5	320	\N	3	\N	\N
259	5	321	\N	3	\N	\N
191	4	215	\N	2	\N	\N
201	4	115	\N	1	\N	\N
211	3	218	\N	2	\N	\N
221	4	318	\N	3	\N	\N
231	5	219	\N	2	\N	\N
241	6	118	\N	1	\N	\N
251	4	220	\N	2	\N	\N
260	4	221	\N	2	\N	\N
192	6	215	\N	2	\N	\N
202	5	316	\N	3	\N	\N
212	3	118	\N	1	\N	\N
222	3	319	\N	3	\N	\N
232	6	319	\N	3	\N	\N
242	5	120	\N	1	\N	\N
252	6	220	\N	2	\N	\N
261	6	221	\N	2	\N	\N
265	2	101	\N	1	\N	\N
266	2	201	\N	2	\N	\N
267	2	301	\N	3	\N	\N
268	2	401	\N	4	\N	\N
269	2	501	\N	5	\N	\N
270	2	202	\N	2	\N	\N
271	2	102	\N	1	\N	\N
272	2	302	\N	3	\N	\N
273	2	402	\N	4	\N	\N
274	2	502	\N	5	\N	\N
275	2	203	\N	2	\N	\N
276	2	103	\N	1	\N	\N
277	2	303	\N	3	\N	\N
278	2	403	\N	4	\N	\N
279	2	503	\N	5	\N	\N
280	2	204	\N	2	\N	\N
281	2	104	\N	1	\N	\N
282	2	304	\N	3	\N	\N
283	2	404	\N	4	\N	\N
284	2	504	\N	5	\N	\N
285	2	205	\N	2	\N	\N
286	2	105	\N	1	\N	\N
287	2	305	\N	3	\N	\N
288	2	405	\N	4	\N	\N
289	2	505	\N	5	\N	\N
290	2	206	\N	2	\N	\N
291	2	106	\N	1	\N	\N
292	2	306	\N	3	\N	\N
293	2	406	\N	4	\N	\N
294	2	506	\N	5	\N	\N
295	2	207	\N	2	\N	\N
296	2	107	\N	1	\N	\N
297	2	307	\N	3	\N	\N
298	2	407	\N	4	\N	\N
299	2	507	\N	5	\N	\N
300	2	208	\N	2	\N	\N
301	2	308	\N	3	\N	\N
302	2	508	\N	5	\N	\N
303	2	108	\N	1	\N	\N
304	2	408	\N	4	\N	\N
305	2	209	\N	2	\N	\N
306	2	309	\N	3	\N	\N
307	2	509	\N	5	\N	\N
308	2	109	\N	1	\N	\N
309	2	409	\N	4	\N	\N
310	2	210	\N	2	\N	\N
311	2	310	\N	3	\N	\N
312	2	510	\N	5	\N	\N
313	2	110	\N	1	\N	\N
314	2	410	\N	4	\N	\N
315	2	211	\N	2	\N	\N
316	2	311	\N	3	\N	\N
317	2	511	\N	5	\N	\N
318	2	111	\N	1	\N	\N
319	2	411	\N	4	\N	\N
320	2	212	\N	2	\N	\N
321	2	312	\N	3	\N	\N
322	2	512	\N	5	\N	\N
323	2	112	\N	1	\N	\N
324	2	412	\N	4	\N	\N
325	2	213	\N	2	\N	\N
326	2	313	\N	3	\N	\N
327	2	513	\N	5	\N	\N
328	2	113	\N	1	\N	\N
329	2	413	\N	4	\N	\N
330	2	214	\N	2	\N	\N
331	2	314	\N	3	\N	\N
332	2	514	\N	5	\N	\N
333	2	114	\N	1	\N	\N
334	2	414	\N	4	\N	\N
335	2	215	\N	2	\N	\N
336	2	315	\N	3	\N	\N
337	2	515	\N	5	\N	\N
338	2	115	\N	1	\N	\N
339	2	415	\N	4	\N	\N
340	2	216	\N	2	\N	\N
341	2	316	\N	3	\N	\N
342	2	516	\N	5	\N	\N
343	2	116	\N	1	\N	\N
344	2	416	\N	4	\N	\N
\.


--
-- Data for Name: inmate_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inmate_role (hostel_admission_no, role) FROM stdin;
3	ms
3	md
\.


--
-- Data for Name: inmate_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inmate_room (hostel_admission_no, room_id) FROM stdin;
3	1
21LH121	301
18MH035	185
18MH041	100
\.


--
-- Data for Name: inmate_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inmate_table (admission_no, hostel_admission_no) FROM stdin;
21LH121	21LH121
4	3
18MH035	18MH035
18MH041	18MH041
\.


--
-- Data for Name: messbill; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messbill (hostel_admission_no, year, month, attendance, mess_charge, extras, feast, lf, af, total, dues) FROM stdin;
3	\N	2023-03	20	3010	0	0	0	0	3050	0
\.


--
-- Data for Name: messout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messout (hostel_admission_no, fromdate, todate, showtodate, messout_id) FROM stdin;
21LH121	2023-06-15	2023-06-18	t	98
21LH121	2023-06-25	2023-06-30	t	114
21LH121	2023-05-10	2023-05-11	t	50
21LH121	2023-05-12	2023-05-13	t	51
3	2023-06-29	2023-07-03	t	115
\.


--
-- Data for Name: messrequirements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messrequirements (key, value) FROM stdin;
messoutdays	0
messoutdaysmaximum	0
messout_days_max_in_month	6
messoutpredaysk	1
\.


--
-- Data for Name: messrequirementslh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messrequirementslh (key, value) FROM stdin;
messout_days_max_in_month	15
messoutdays	1
messoutdaysmaximum	5
messoutpredaysk	2
\.


--
-- Data for Name: path; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.path (pathno, path) FROM stdin;
\.


--
-- Data for Name: perdaymessexpenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perdaymessexpenses (id, bill_date, bill_no, particulars, supplier_id, bill_amount, hostel, status, dates) FROM stdin;
13	2023-06-18	18	{rice,lays}	6	19000	MH	5	{2023-06-27,2023-06-28,2023-06-29,2023-06-29,2023-06-29,2023-06-29}
14	2023-06-16	189	{ghee,tomato}	6	17000	MH	0	{2023-06-29}
15	2023-06-14	1678	{rice,tomato,milk}	6	16000	LH	1	{2023-06-29,2023-06-29}
\.


--
-- Data for Name: rank_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rank_list (user_id, rank, verified) FROM stdin;
4	1	f
\.


--
-- Data for Name: roles_faculty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_faculty (roleid, userid, role) FROM stdin;
1	2	SA
2	2	WD
\.


--
-- Data for Name: room_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_request (hostel_admission_no, preferred_room, reason, confirmed) FROM stdin;
\.


--
-- Data for Name: staff_advisor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_advisor (roleid, batchid) FROM stdin;
1	1
\.


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (admission_no, batchid, year_of_admission, address, stage) FROM stdin;
21LH121	\N	2020	\N	inmate
4	1	2020	CWRDM QUARTERS\nKunnamangalam	inmate
18MH035	\N	\N	\N	inmate
18MH041	\N	\N	\N	inmate
\.


--
-- Data for Name: student_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_progress (admission_no, semester, attendance, sessionals, university_marks, no_of_backpapers) FROM stdin;
4	\N	\N	\N	\N	\N
\.


--
-- Data for Name: supplier_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplier_list (supplier_id, name) FROM stdin;
6	lakshmi stores
7	stores rice
8	smi plant
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, password, name, email, mobile_no, designation, is_admin) FROM stdin;
2	$2a$08$KR.on4N.QdbLiFMO9xiRRevcTzFvzQIf4ki9k2ykfZtWKClySWcsi	faculty1	tve20cs075@cet.ac.in	7736070884	faculty	f
1	$2a$08$NKFDKz0UKZvVPraDhsLqjOlr0jbhWAWiha1yiQ881fSZr9kiJRsIi	Admin	nadeemblayparambil@cet.ac.in	7736070884	faculty	t
21LH121	$2a$08$4zIziQNVZIwosTpvKwn99.ZsLoyOiMRDakIfI8g31XFhKkE.LsjsK	Athira b	tve20cs037@cet.ac.in	9496895715	student	f
18MH035	$2a$08$5tTFyZPTANOvB/beL64WnOEBD6lMsbUhGpvFe5wgBc07fMbT8oPme	LARIN MANOHARAN. K	\N	\N	student	f
18MH041	$2a$08$tgo9t7m/JZxYJP7wGez.rucVdE0uamsbXPrody7RjQPpmHMOZoc2G	AROMAL SAJITH	\N	\N	student	f
4	$2a$10$gpfwEz0wSuzIHHT4kyc9NeuaMzjArpuYY27WQHnJdH3v0l872Rf4G	nadeem	nadeemblayparambil@gmail.com	+917736070884	student	f
\.


--
-- Name: batch_batchid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.batch_batchid_seq', 1, false);


--
-- Name: certificate_application_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certificate_application_application_id_seq', 1, false);


--
-- Name: certificates_certificate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certificates_certificate_id_seq', 1, false);


--
-- Name: hostel_application_applicationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hostel_application_applicationid_seq', 2, true);


--
-- Name: hostel_blocks_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hostel_blocks_block_id_seq', 7, true);


--
-- Name: hostel_out_entryno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hostel_out_entryno_seq', 1, false);


--
-- Name: hostel_room_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hostel_room_room_id_seq', 344, true);


--
-- Name: messout_messout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messout_messout_id_seq', 115, true);


--
-- Name: path_pathno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.path_pathno_seq', 1, false);


--
-- Name: perdaymessexpenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perdaymessexpenses_id_seq', 15, true);


--
-- Name: roles_faculty_roleid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_faculty_roleid_seq', 2, true);


--
-- Name: supplier_list_supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.supplier_list_supplier_id_seq', 8, true);


--
-- Name: allotment_columns allotment_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allotment_columns
    ADD CONSTRAINT allotment_columns_pkey PRIMARY KEY (column_letter);


--
-- Name: batch batch_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.batch
    ADD CONSTRAINT batch_pkey PRIMARY KEY (batchid);


--
-- Name: certificate_application certificate_application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_application
    ADD CONSTRAINT certificate_application_pkey PRIMARY KEY (application_id);


--
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (certificate_id);


--
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (userid);


--
-- Name: entrance_exam_marks entrance_exam_marks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrance_exam_marks
    ADD CONSTRAINT entrance_exam_marks_pkey PRIMARY KEY (applicationid);


--
-- Name: faculty faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pkey PRIMARY KEY (pen_no);


--
-- Name: hod hod_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hod
    ADD CONSTRAINT hod_pkey PRIMARY KEY (roleid);


--
-- Name: hostel_application hostel_application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_application
    ADD CONSTRAINT hostel_application_pkey PRIMARY KEY (applicationid);


--
-- Name: hostel_authority hostel_authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_authority
    ADD CONSTRAINT hostel_authority_pkey PRIMARY KEY (roleid);


--
-- Name: hostel_blocks hostel_blocks_block_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_blocks
    ADD CONSTRAINT hostel_blocks_block_id_key UNIQUE (block_id);


--
-- Name: hostel_blocks hostel_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_blocks
    ADD CONSTRAINT hostel_blocks_pkey PRIMARY KEY (hostel, block_name);


--
-- Name: hostel_out hostel_out_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_out
    ADD CONSTRAINT hostel_out_pkey PRIMARY KEY (entryno);


--
-- Name: hostel_room hostel_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_room
    ADD CONSTRAINT hostel_room_pkey PRIMARY KEY (room_id);


--
-- Name: inmate_role inmate_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_role
    ADD CONSTRAINT inmate_role_pkey PRIMARY KEY (hostel_admission_no, role);


--
-- Name: inmate_room inmate_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_room
    ADD CONSTRAINT inmate_room_pkey PRIMARY KEY (hostel_admission_no);


--
-- Name: inmate_table inmate_table_hostel_admission_no_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_table
    ADD CONSTRAINT inmate_table_hostel_admission_no_key UNIQUE (hostel_admission_no);


--
-- Name: inmate_table inmate_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_table
    ADD CONSTRAINT inmate_table_pkey PRIMARY KEY (admission_no);


--
-- Name: messbill messbill_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messbill
    ADD CONSTRAINT messbill_pkey PRIMARY KEY (hostel_admission_no);


--
-- Name: messrequirements messrequirements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messrequirements
    ADD CONSTRAINT messrequirements_pkey PRIMARY KEY (key);


--
-- Name: path path_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path
    ADD CONSTRAINT path_pkey PRIMARY KEY (pathno);


--
-- Name: perdaymessexpenses perdaymessexpenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perdaymessexpenses
    ADD CONSTRAINT perdaymessexpenses_pkey PRIMARY KEY (id);


--
-- Name: rank_list rank_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rank_list
    ADD CONSTRAINT rank_list_pkey PRIMARY KEY (user_id);


--
-- Name: roles_faculty roles_faculty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_faculty
    ADD CONSTRAINT roles_faculty_pkey PRIMARY KEY (roleid);


--
-- Name: room_request room_request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_request
    ADD CONSTRAINT room_request_pkey PRIMARY KEY (hostel_admission_no);


--
-- Name: staff_advisor staff_advisor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_advisor
    ADD CONSTRAINT staff_advisor_pkey PRIMARY KEY (roleid);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (admission_no);


--
-- Name: student_progress student_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_pkey PRIMARY KEY (admission_no);


--
-- Name: supplier_list supplier_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier_list
    ADD CONSTRAINT supplier_list_pkey PRIMARY KEY (supplier_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: certificate_application certificate_application_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_application
    ADD CONSTRAINT certificate_application_admission_no_fkey FOREIGN KEY (admission_no) REFERENCES public.student(admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: certificate_application certificate_application_certificate_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_application
    ADD CONSTRAINT certificate_application_certificate_id_fkey FOREIGN KEY (certificate_id) REFERENCES public.certificates(certificate_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: certificates certificates_pathno_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pathno_fkey FOREIGN KEY (pathno) REFERENCES public.path(pathno) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: complaints complaints_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_userid_fkey FOREIGN KEY (userid) REFERENCES public.student(admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entrance_exam_marks entrance_exam_marks_applicationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entrance_exam_marks
    ADD CONSTRAINT entrance_exam_marks_applicationid_fkey FOREIGN KEY (applicationid) REFERENCES public.hostel_application(applicationid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: faculty faculty_pen_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faculty
    ADD CONSTRAINT faculty_pen_no_fkey FOREIGN KEY (pen_no) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hod hod_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hod
    ADD CONSTRAINT hod_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.roles_faculty(roleid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hostel_application hostel_application_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_application
    ADD CONSTRAINT hostel_application_userid_fkey FOREIGN KEY (user_id) REFERENCES public.student(admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hostel_authority hostel_authority_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_authority
    ADD CONSTRAINT hostel_authority_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.roles_faculty(roleid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hostel_out hostel_out_hostel_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_out
    ADD CONSTRAINT hostel_out_hostel_admission_no_fkey FOREIGN KEY (hostel_admission_no) REFERENCES public.inmate_table(hostel_admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: hostel_room hostel_room_block_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hostel_room
    ADD CONSTRAINT hostel_room_block_id_fkey FOREIGN KEY (block_id) REFERENCES public.hostel_blocks(block_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inmate_role inmate_role_hostel_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_role
    ADD CONSTRAINT inmate_role_hostel_admission_no_fkey FOREIGN KEY (hostel_admission_no) REFERENCES public.inmate_table(hostel_admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inmate_room inmate_room_hostel_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_room
    ADD CONSTRAINT inmate_room_hostel_admission_no_fkey FOREIGN KEY (hostel_admission_no) REFERENCES public.inmate_table(hostel_admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inmate_room inmate_room_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_room
    ADD CONSTRAINT inmate_room_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.hostel_room(room_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: inmate_table inmate_table_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inmate_table
    ADD CONSTRAINT inmate_table_admission_no_fkey FOREIGN KEY (admission_no) REFERENCES public.student(admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messbill messbill_hostel_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messbill
    ADD CONSTRAINT messbill_hostel_admission_no_fkey FOREIGN KEY (hostel_admission_no) REFERENCES public.inmate_table(hostel_admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messout messout_hostel_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messout
    ADD CONSTRAINT messout_hostel_admission_no_fkey FOREIGN KEY (hostel_admission_no) REFERENCES public.inmate_table(hostel_admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: perdaymessexpenses perdaymessexpenses_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perdaymessexpenses
    ADD CONSTRAINT perdaymessexpenses_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.supplier_list(supplier_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rank_list rank_list_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rank_list
    ADD CONSTRAINT rank_list_userid_fkey FOREIGN KEY (user_id) REFERENCES public.student(admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: roles_faculty roles_faculty_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_faculty
    ADD CONSTRAINT roles_faculty_userid_fkey FOREIGN KEY (userid) REFERENCES public.faculty(pen_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: room_request room_request_hostel_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_request
    ADD CONSTRAINT room_request_hostel_admission_no_fkey FOREIGN KEY (hostel_admission_no) REFERENCES public.inmate_table(hostel_admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: staff_advisor staff_advisor_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_advisor
    ADD CONSTRAINT staff_advisor_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.roles_faculty(roleid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student student_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_admission_no_fkey FOREIGN KEY (admission_no) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student student_batchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_batchid_fkey FOREIGN KEY (batchid) REFERENCES public.batch(batchid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student_progress student_progress_admission_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_admission_no_fkey FOREIGN KEY (admission_no) REFERENCES public.student(admission_no) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

