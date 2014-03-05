USE [Daylight]
GO

/****** Object:  Table [dbo].[Address]    Script Date: 11/18/2013 6:31:03 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Address](
	[AddressId] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[Building] [varchar](255) NULL,
	[Street] [varchar](255) NULL,
	[AreaLocality] [varchar](255) NULL,
	[City] [varchar](255) NULL,
	[District] [varchar](255) NULL,
	[Province] [varchar](255) NULL,
	[Country] [varchar](255) NULL,
	[Type] [varchar](50) NULL,
	[GeoLocation] [geography] NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Address] ADD  CONSTRAINT [DF_dbo.Address_AddressId]  DEFAULT (newid()) FOR [AddressId]
GO

ALTER TABLE [dbo].[Address] ADD  CONSTRAINT [DF_Address_PatientId]  DEFAULT (newid()) FOR [PatientId]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Address_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Address_Patient]
GO

