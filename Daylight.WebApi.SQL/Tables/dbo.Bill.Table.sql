USE [Daylight]
GO
/****** Object:  Table [dbo].[Bill]    Script Date: 06/24/2014 20:31:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Bill](
	[BillId] [uniqueidentifier] NOT NULL,
	[DueDate] [datetime] NULL,
	[Amount] [money] NOT NULL,
	[Details] [varchar](max) NULL,
 CONSTRAINT [PK_PatientBill] PRIMARY KEY CLUSTERED 
(
	[BillId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Bill] ADD  CONSTRAINT [DF_Bill_BillId]  DEFAULT (newid()) FOR [BillId]
GO
