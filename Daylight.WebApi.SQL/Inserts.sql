use Daylight;
go

insert into Name
values (newid(), 'Christopher', 'Dambamuromo', null, 'legal', 'Mr', null, 'MSc. Intelligent Computing Systems');

select * from name

select * from Telecoms

insert into Telecoms
values (newid(), 'email', 'personal', 'chridam@gmail.com', 1);

select * from Telecoms

select * from [dbo].[Address]
insert into [dbo].[Address]
values (newid(), 'Canaan Row', 'Foxhole Road', 'st. Thomas', 'Swansea', null, null, 'West Glamorgan', 'Residential', null);
select * from [dbo].[Address]

select * from Relationship
insert into Relationship
values (newid(), 'Rudo', 'Dambamuromo', null, 'F', 1, '1987-10-23 12:43:10', 'Spouse');
select * from Relationship

insert into Patient
values (newid(), 0, 'M', 'Married', 'B85BBC61-4515-4EDB-90A8-F6AB55CCA21C', 'D32926EB-4ED5-4544-B62D-CB8DF7443D3D', '1979-09-27 07:15:32', 0, current_timestamp, null, 'chridam', 'AEB010A9-A468-4AA9-A5C9-BF818EF34DC3', '843EB8E9-FD76-4F27-9EE1-8553F9FDA9D6');
select * from Patient
