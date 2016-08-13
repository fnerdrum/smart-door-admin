drop table if exists entries;
create table entries (
  id integer primary key autoincrement,
  entry_time timestamp not null,
  image string not null,
  system_tag integer,
  manual_tag integer,
  foreign key(system_tag) references users(id),
  foreign key(manual_tag) references users(id)
);

drop table if exists users;
create table users (
    id integer primary key autoincrement,
    name string not null
);