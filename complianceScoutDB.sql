create database ComplianceScoutDB;

use ComplianceScoutDB;

create table company(
	c_id varchar(32) NOT NUll,
    c_name varchar(32),
    c_ein int,
    primary key (c_id)
);

create table stakeholders(
	s_id varchar(32) NOT NUll,
    c_id varchar(32) NOT NUll,
    s_fname varchar(32),
    s_lname varchar(32),
    s_title varchar(32),
    s_dob date,
    s_placeOfBirth varchar(255),
    s_address varchar(255),
    s_email varchar(32),
    s_percent_ownership decimal(20,2),
    s_spouse_fname varchar(32),
    s_spouse_lname varchar(32),
    s_loan_invested decimal(20,2),
    s_personalFundsInvested decimal(20,2),
    primary key (s_id),
	foreign key (c_id) references company(c_id)
    on delete cascade
);

create table locations(
c_id varchar(32) NOT NUll,
loc_id varchar(32) not null,
first_date_op date,
purchase_price decimal(20,2),
purchase_date date,
lease_exp_date date,
rent decimal(20,2),
property_owner_company varchar(255),
property_owner_ein int,
c_address varchar(255),
c_mailAdress varchar(255),
c_city varchar(255),
c_county varchar(255),
c_email varchar(32),
c_locationName varchar(255),
c_phoneNumber varchar(32),
primary key (loc_id),
foreign key (c_id) references company(c_id)
on delete cascade
);

create table company_licenses(
l_id varchar(32) not null,
loc_id varchar(32) not null,
license_status varchar(32),
license_status_date date,
license_name varchar (255),
license_cost decimal (20,2),
primary key (l_id),
foreign key (loc_id) references locations(loc_id)
on delete cascade
);
