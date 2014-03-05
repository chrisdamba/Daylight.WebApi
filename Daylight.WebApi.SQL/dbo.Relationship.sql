USE [Daylight]
GO

/****** Object:  Table [dbo].[Relationship]    Script Date: 11/18/2013 6:53:12 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Relationship](
	[Id] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[GivenName] [varchar](255) NOT NULL,
	[FamilyName] [varchar](255) NOT NULL,
	[MiddleName] [varchar](255) NULL,
	[Gender] [char](1) NOT NULL,
	[Dependent] [bit] NOT NULL,
	[DateOfBirth] [smalldatetime] NOT NULL,
	[Type] [varchar](50) NULL,
 CONSTRAINT [PK_Relationship] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Relationship] ADD  CONSTRAINT [DF_Relationship_PatientId]  DEFAULT (newid()) FOR [PatientId]
GO

ALTER TABLE [dbo].[Relationship]  WITH CHECK ADD  CONSTRAINT [FK_Relationship_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Relationship] CHECK CONSTRAINT [FK_Relationship_Patient]
GO

