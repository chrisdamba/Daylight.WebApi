USE [Daylight]
GO

/****** Object:  Table [dbo].[PatientBill]    Script Date: 11/19/2013 7:42:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[PatientBill](
	[BillId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[DateBillPaid] [datetime] NULL,
	[TotalAmountDue] [money] NOT NULL,
	[Details] [varchar](max) NULL,
 CONSTRAINT [PK_PatientBill] PRIMARY KEY CLUSTERED 
(
	[BillId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[PatientBill]  WITH CHECK ADD  CONSTRAINT [FK_PatientBill_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[PatientBill] CHECK CONSTRAINT [FK_PatientBill_Patient]
GO

