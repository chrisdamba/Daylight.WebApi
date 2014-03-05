USE [Daylight]
GO

/****** Object:  Table [dbo].[VisitProcedure]    Script Date: 11/19/2013 7:46:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[VisitProcedure](
	[VisitId] [uniqueidentifier] NOT NULL,
	[ProcedureId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[Quantity] [int] NOT NULL,
	[DerivedCostOfProcedures] [money] NOT NULL,
 CONSTRAINT [PK_VisitProcedure] PRIMARY KEY CLUSTERED 
(
	[VisitId] ASC,
	[ProcedureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[VisitProcedure]  WITH CHECK ADD  CONSTRAINT [FK_VisitProcedure_MedicalProcedure] FOREIGN KEY([ProcedureId])
REFERENCES [dbo].[Procedure] ([ProcedureId])
GO

ALTER TABLE [dbo].[VisitProcedure] CHECK CONSTRAINT [FK_VisitProcedure_MedicalProcedure]
GO

ALTER TABLE [dbo].[VisitProcedure]  WITH CHECK ADD  CONSTRAINT [FK_VisitProcedure_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[VisitProcedure] CHECK CONSTRAINT [FK_VisitProcedure_Patient]
GO

ALTER TABLE [dbo].[VisitProcedure]  WITH CHECK ADD  CONSTRAINT [FK_VisitProcedure_Visit] FOREIGN KEY([VisitId])
REFERENCES [dbo].[Visit] ([VisitId])
GO

ALTER TABLE [dbo].[VisitProcedure] CHECK CONSTRAINT [FK_VisitProcedure_Visit]
GO

