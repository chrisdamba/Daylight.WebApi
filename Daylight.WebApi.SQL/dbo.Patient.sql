USE [Daylight]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 1/9/2014 10:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientId] [uniqueidentifier] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Gender] [char](1) NOT NULL,
	[RelationshipStatus] [varchar](10) NULL,
	[DateOfBirth] [smalldatetime] NOT NULL,
	[DateBecamePatient] [datetime] NOT NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Phone] [varchar](15) NULL,
	[Email] [varchar](150) NULL,
	[Address] [varchar](255) NULL,
 CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Patient] ADD  CONSTRAINT [DF_Patient_PatientId]  DEFAULT (newid()) FOR [PatientId]
GO
ALTER TABLE [dbo].[Patient] ADD  CONSTRAINT [DF_Patient_DateBecamePatient]  DEFAULT (getdate()) FOR [DateBecamePatient]
GO
