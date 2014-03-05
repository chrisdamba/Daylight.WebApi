USE [Daylight]
GO

/****** Object:  Table [dbo].[MedicalCenter]    Script Date: 11/19/2013 7:38:04 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MedicalCenter](
	[MedicalCenterId] [uniqueidentifier] NOT NULL,
	[AddressId] [uniqueidentifier] NOT NULL,
	[Extension] [xml] NULL,
 CONSTRAINT [PK_MedicalCenter] PRIMARY KEY CLUSTERED 
(
	[MedicalCenterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[MedicalCenter] ADD  CONSTRAINT [DF_MedicalCenter_MedicalCenterId]  DEFAULT (newid()) FOR [MedicalCenterId]
GO

ALTER TABLE [dbo].[MedicalCenter]  WITH CHECK ADD  CONSTRAINT [FK_MedicalCenter_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[MedicalCenter] CHECK CONSTRAINT [FK_MedicalCenter_Address]
GO

