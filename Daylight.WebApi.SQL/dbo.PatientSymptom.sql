USE [Daylight]
GO

/****** Object:  Table [dbo].[PatientSymptom]    Script Date: 11/19/2013 7:42:45 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[PatientSymptom](
	[PatientId] [uniqueidentifier] NOT NULL,
	[SymptomId] [uniqueidentifier] NOT NULL,
	[ObservationDateTime] [datetime] NOT NULL,
	[SymptomValue] [varchar](50) NULL,
 CONSTRAINT [PK_PatientSymptom_1] PRIMARY KEY CLUSTERED 
(
	[SymptomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[PatientSymptom] ADD  CONSTRAINT [DF_PatientSymptom_ObservationDateTime]  DEFAULT (getdate()) FOR [ObservationDateTime]
GO

ALTER TABLE [dbo].[PatientSymptom]  WITH CHECK ADD  CONSTRAINT [FK_PatientSymptom_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[PatientSymptom] CHECK CONSTRAINT [FK_PatientSymptom_Patient]
GO

