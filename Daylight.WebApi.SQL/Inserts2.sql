use Daylight;
go

select top 10 * from Patient

select top 10 * from Name




Update 
	Patient
set 
	Patient.FirstName = nm.GivenName
	,Patient.LastName = nm.FamilyName
from
	Patient p
inner join
	Name nm
on
	p.PatientId = nm.PatientId


select top 10 * from Patient