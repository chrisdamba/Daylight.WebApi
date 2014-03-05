USE [Daylight]
GO

/****** Object:  Table [dbo].[DiseaseSymptom]    Script Date: 11/19/2013 7:18:20 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[DiseaseSymptom](
	[DiseaseId] [uniqueidentifier] NOT NULL,
	[SymptomId] [uniqueidentifier] NOT NULL,
	[ExpectedProbability] [decimal](18, 0) NULL,
	[MinimumValue] [varchar](50) NULL,
	[MaximumValue] [varchar](50) NULL,
	[ReadingOtherValue] [varchar](50) NULL,
	[Comments] [varchar](max) NULL,
 CONSTRAINT [PK_DiseaseSymptom] PRIMARY KEY CLUSTERED 
(
	[DiseaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[DiseaseSymptom]  WITH CHECK ADD  CONSTRAINT [FK_DiseaseSymptom_Disease] FOREIGN KEY([SymptomId])
REFERENCES [dbo].[Symptom] ([SymptomId])
GO

ALTER TABLE [dbo].[DiseaseSymptom] CHECK CONSTRAINT [FK_DiseaseSymptom_Disease]
GO

