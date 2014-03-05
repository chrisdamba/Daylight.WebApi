USE [Daylight]
GO

/****** Object:  Table [dbo].[Procedure]    Script Date: 11/19/2013 7:43:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Procedure](
	[ProcedureId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[ConditionId] [uniqueidentifier] NOT NULL,
	[ConceptId] [int] NOT NULL,
	[Name] [varchar](255) NULL,
	[StartedAt] [datetime] NOT NULL,
	[FinishedAt] [datetime] NULL,
	[Cost] [money] NOT NULL,
	[Extension] [xml] NULL,
	[Code] [varchar](6) NOT NULL,
 CONSTRAINT [PK_MedicalProcedure] PRIMARY KEY CLUSTERED 
(
	[ProcedureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Procedure]  WITH CHECK ADD  CONSTRAINT [FK_Procedure_Condition] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])
GO

ALTER TABLE [dbo].[Procedure] CHECK CONSTRAINT [FK_Procedure_Condition]
GO

ALTER TABLE [dbo].[Procedure]  WITH CHECK ADD  CONSTRAINT [FK_Procedure_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Procedure] CHECK CONSTRAINT [FK_Procedure_Patient]
GO

