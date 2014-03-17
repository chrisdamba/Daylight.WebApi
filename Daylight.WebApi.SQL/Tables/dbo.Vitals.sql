USE [Daylight]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Vitals_Patient]') AND parent_object_id = OBJECT_ID(N'[dbo].[Vitals]'))
ALTER TABLE [dbo].[Vitals] DROP CONSTRAINT [FK_Vitals_Patient]
GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Vitals]    Script Date: 03/17/2014 18:59:33 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Vitals]') AND type in (N'U'))
DROP TABLE [dbo].[Vitals]
GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Vitals]    Script Date: 03/17/2014 18:59:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Vitals](
	[ObservationId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[DateRecorded] [datetime2](7) NOT NULL,
	[Pulse] [float] NULL,
	[BloodGlucose] [float] NULL,
	[DiastolicBP] [smallint] NULL,
	[SystolicBP] [smallint] NULL,
	[BodyTemperature] [float] NULL,
	[Weight] [float] NULL,
	[Height] [float] NULL,
 CONSTRAINT [PK_Vitals] PRIMARY KEY CLUSTERED 
(
	[ObservationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Vitals]  WITH CHECK ADD  CONSTRAINT [FK_Vitals_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Vitals] CHECK CONSTRAINT [FK_Vitals_Patient]
GO

