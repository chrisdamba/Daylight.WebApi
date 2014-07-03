USE [Daylight]
GO
/****** Object:  Table [dbo].[PatientBill]    Script Date: 07/03/2014 22:15:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatientBill](
	[BillId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_PatientBill_1] PRIMARY KEY CLUSTERED 
(
	[BillId] ASC,
	[PatientId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  ForeignKey [FK_PatientBill_Bill]    Script Date: 07/03/2014 22:15:27 ******/
ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Bill] FOREIGN KEY([BillId])
REFERENCES [dbo].[Bill] ([BillId])
GO
ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Bill]
GO
/****** Object:  ForeignKey [FK_PatientBill_Patient]    Script Date: 07/03/2014 22:15:27 ******/
ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Patient]
GO
