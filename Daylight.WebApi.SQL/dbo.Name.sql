USE [Daylight]
GO

/****** Object:  Table [dbo].[Name]    Script Date: 11/18/2013 6:52:16 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Name](
	[Id] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[GivenName] [varchar](255) NOT NULL,
	[FamilyName] [varchar](255) NULL,
	[MiddleName] [varchar](255) NULL,
	[Type] [varchar](50) NOT NULL,
	[Prefix] [varchar](6) NULL,
	[Suffix] [varchar](6) NULL,
	[Degree] [varchar](255) NULL,
 CONSTRAINT [PK_Name] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Name] ADD  CONSTRAINT [DF_Name_Id]  DEFAULT (newid()) FOR [Id]
GO

ALTER TABLE [dbo].[Name] ADD  CONSTRAINT [DF_Name_PatientId]  DEFAULT (newid()) FOR [PatientId]
GO

ALTER TABLE [dbo].[Name]  WITH CHECK ADD  CONSTRAINT [FK_Name_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Name] CHECK CONSTRAINT [FK_Name_Patient]
GO

