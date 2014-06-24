USE [Daylight]
GO
/****** Object:  Table [dbo].[PaymentMethod]    Script Date: 06/24/2014 20:31:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PaymentMethod](
	[PaymentMethodId] [uniqueidentifier] NOT NULL,
	[Details] [varchar](max) NOT NULL,
 CONSTRAINT [PK_PatientPaymentMethod] PRIMARY KEY CLUSTERED 
(
	[PaymentMethodId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[PaymentMethod] ADD  CONSTRAINT [DF_PaymentMethod_PaymentMethodId]  DEFAULT (newid()) FOR [PaymentMethodId]
GO
