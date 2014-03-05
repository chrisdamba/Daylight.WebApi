USE [Daylight]
GO

/****** Object:  Table [dbo].[Condition]    Script Date: 11/18/2013 6:43:32 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Condition] ADD  CONSTRAINT [DF_Condition_ConditionId]  DEFAULT (newid()) FOR [ConditionId]
GO

ALTER TABLE [dbo].[Condition]  WITH CHECK ADD  CONSTRAINT [FK_Condition_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Condition] CHECK CONSTRAINT [FK_Condition_Patient]
GO

