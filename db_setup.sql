drop database tododb;

create database tododb;

use tododb;

create table usertable (
nickname varchar(255) not null,
email varchar(255) not null,
pass varchar(255) not null,
primary key (email)
);


insert into usertable
values ("admin","admin@gmail.com","admin");

insert into usertable
values ("hadas","hadasg11@gmail.com","1234");


create table taskstable
(
instanceTime int(11) not null,
item varchar(45) not null,
email varchar(255) not null,
ischeck boolean not null,
foreign key (email) references usertable(email),
primary key (instanceTime, email)
);

insert into taskstable
values (UNIX_TIMESTAMP(NOW()),"to call mom","admin@gmail.com",false);

insert into taskstable
values (current_timestamp,"write papter","admin@gmail.com",false);

insert into taskstable
values (current_timestamp,"paint chair","admin@gmail.com",false);


DELETE FROM taskstable
WHERE (instanceTime  like "2018-02-10 16:19:12" AND  email like "admin@gmail.com");

