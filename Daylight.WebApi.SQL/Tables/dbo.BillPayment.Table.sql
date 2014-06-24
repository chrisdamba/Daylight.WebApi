USE [Daylight]
GO
/****** Object:  Table [dbo].[BillPayment]    Script Date: 06/24/2014 20:31:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BillPayment](
	[BillId] [uniqueidentifier] NOT NULL,
	[PaymentTransactionId] [uniqueidentifier] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BillPayment]  WITH CHECK ADD  CONSTRAINT [FK_BillPayment_Bill] FOREIGN KEY([BillId])
REFERENCES [dbo].[Bill] ([BillId])
GO
ALTER TABLE [dbo].[BillPayment] CHECK CONSTRAINT [FK_BillPayment_Bill]
GO
ALTER TABLE [dbo].[BillPayment]  WITH CHECK ADD  CONSTRAINT [FK_BillPayment_Payment] FOREIGN KEY([PaymentTransactionId])
REFERENCES [dbo].[Payment] ([PaymentTransactionId])
GO
ALTER TABLE [dbo].[BillPayment] CHECK CONSTRAINT [FK_BillPayment_Payment]
GO
