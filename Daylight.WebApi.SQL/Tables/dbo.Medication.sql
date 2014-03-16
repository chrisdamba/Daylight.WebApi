USE [Daylight]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Medication_Condition]') AND parent_object_id = OBJECT_ID(N'[dbo].[Medication]'))
ALTER TABLE [dbo].[Medication] DROP CONSTRAINT [FK_Medication_Condition]
GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Medication]    Script Date: 03/16/2014 22:34:34 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Medication]') AND type in (N'U'))
DROP TABLE [dbo].[Medication]
GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Medication]    Script Date: 03/16/2014 22:34:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Medication](
	[MedicationId] [uniqueidentifier] NOT NULL,
	[ConditionId] [uniqueidentifier] NOT NULL,
	[ConceptId] [int] NOT NULL,
	[Name] [varchar](255) NULL,
	[StartedAt] [datetime] NOT NULL,
	[FinishedAt] [datetime] NULL,
	[Cost] [money] NOT NULL,
 CONSTRAINT [PK_Medication] PRIMARY KEY CLUSTERED 
(
	[MedicationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Medication]  WITH CHECK ADD  CONSTRAINT [FK_Medication_Condition] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])
GO

ALTER TABLE [dbo].[Medication] CHECK CONSTRAINT [FK_Medication_Condition]
GO

