USE [Daylight]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Condition_Patient]') AND parent_object_id = OBJECT_ID(N'[dbo].[Condition]'))
ALTER TABLE [dbo].[Condition] DROP CONSTRAINT [FK_Condition_Patient]
GO

IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Condition_ConditionId]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Condition] DROP CONSTRAINT [DF_Condition_ConditionId]
END

GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Condition]    Script Date: 03/16/2014 22:34:09 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Condition]') AND type in (N'U'))
DROP TABLE [dbo].[Condition]
GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Condition]    Script Date: 03/16/2014 22:34:09 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Condition](
	[ConditionId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[StartedAt] [datetime] NOT NULL,
	[ConceptId] [int] NOT NULL,
	[FinishedAt] [datetime] NULL,
	[Name] [varchar](255) NULL,
 CONSTRAINT [PK_Condition] PRIMARY KEY CLUSTERED 
(
	[ConditionId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Condition]  WITH CHECK ADD  CONSTRAINT [FK_Condition_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Condition] CHECK CONSTRAINT [FK_Condition_Patient]
GO

ALTER TABLE [dbo].[Condition] ADD  CONSTRAINT [DF_Condition_ConditionId]  DEFAULT (newid()) FOR [ConditionId]
GO

