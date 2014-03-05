USE [Daylight]
GO

/****** Object:  Table [dbo].[PatientPaymentMethod]    Script Date: 11/19/2013 7:42:30 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[PatientPaymentMethod](
	[MethodId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[Code] [varchar](6) NOT NULL,
	[Details] [varchar](max) NOT NULL,
 CONSTRAINT [PK_PatientPaymentMethod] PRIMARY KEY CLUSTERED 
(
	[MethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[PatientPaymentMethod]  WITH CHECK ADD  CONSTRAINT [FK_PatientPaymentMethod_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[PatientPaymentMethod] CHECK CONSTRAINT [FK_PatientPaymentMethod_Patient]
GO

