USE [Daylight]
GO

/****** Object:  Table [dbo].[Medication]    Script Date: 11/18/2013 6:52:28 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Medication](
	[MedicationId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[ConditionId] [uniqueidentifier] NOT NULL,
	[ConceptId] [int] NOT NULL,
	[Name] [varchar](255) NULL,
	[StartedAt] [datetime] NOT NULL,
	[FinishedAt] [datetime] NULL,
	[Cost] [money] NOT NULL,
	[Extension] [xml] NULL,
	[Code] [varchar](6) NOT NULL,
 CONSTRAINT [PK_Medication] PRIMARY KEY CLUSTERED 
(
	[MedicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Medication]  WITH CHECK ADD  CONSTRAINT [FK_Medication_Condition] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])
GO

ALTER TABLE [dbo].[Medication] CHECK CONSTRAINT [FK_Medication_Condition]
GO

ALTER TABLE [dbo].[Medication]  WITH CHECK ADD  CONSTRAINT [FK_Medication_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Medication] CHECK CONSTRAINT [FK_Medication_Patient]
GO

