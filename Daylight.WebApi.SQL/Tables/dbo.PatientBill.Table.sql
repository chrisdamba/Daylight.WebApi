USE [Daylight]
GO
/****** Object:  Table [dbo].[PatientBill]    Script Date: 06/24/2014 20:31:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatientBill](
	[BillId] [uniqueidentifier] NOT NULL,
	[ConditionId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[MedicationId] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Bill] FOREIGN KEY([BillId])
REFERENCES [dbo].[Bill] ([BillId])
GO
ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Bill]
GO
ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Condition] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])
GO
ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Condition]
GO
ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Medication] FOREIGN KEY([MedicationId])
REFERENCES [dbo].[Medication] ([MedicationId])
GO
ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Medication]
GO
ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Patient]
GO
