USE [Daylight]
GO
/****** Object:  Table [dbo].[MedicalAid]    Script Date: 06/24/2014 20:31:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MedicalAid](
	[MedicalAidId] [uniqueidentifier] NOT NULL,
	[MedicalAidName] [varchar](255) NOT NULL,
	[Phone] [varchar](50) NULL,
	[Address] [varchar](max) NULL,
 CONSTRAINT [PK_MedicalAid] PRIMARY KEY CLUSTERED 
(
	[MedicalAidId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[MedicalAid] ADD  CONSTRAINT [DF_MedicalAid_MedicalAidId]  DEFAULT (newid()) FOR [MedicalAidId]
GO
