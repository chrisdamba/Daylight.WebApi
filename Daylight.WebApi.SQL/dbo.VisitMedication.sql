USE [Daylight]
GO

/****** Object:  Table [dbo].[VisitMedication]    Script Date: 11/19/2013 7:45:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[VisitMedication](
	[VisitId] [uniqueidentifier] NOT NULL,
	[MedicationId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
	[DerivedCostOfMedication] [money] NULL,
 CONSTRAINT [PK_VisitMedication] PRIMARY KEY CLUSTERED 
(
	[VisitId] ASC,
	[MedicationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[VisitMedication]  WITH CHECK ADD  CONSTRAINT [FK_VisitMedication_Medication] FOREIGN KEY([MedicationId])
REFERENCES [dbo].[Medication] ([MedicationId])
GO

ALTER TABLE [dbo].[VisitMedication] CHECK CONSTRAINT [FK_VisitMedication_Medication]
GO

ALTER TABLE [dbo].[VisitMedication]  WITH CHECK ADD  CONSTRAINT [FK_VisitMedication_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[VisitMedication] CHECK CONSTRAINT [FK_VisitMedication_Patient]
GO

ALTER TABLE [dbo].[VisitMedication]  WITH CHECK ADD  CONSTRAINT [FK_VisitMedication_Visit] FOREIGN KEY([VisitId])
REFERENCES [dbo].[Visit] ([VisitId])
GO

ALTER TABLE [dbo].[VisitMedication] CHECK CONSTRAINT [FK_VisitMedication_Visit]
GO

