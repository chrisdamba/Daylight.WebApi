USE [Daylight]
GO

/****** Object:  Table [dbo].[Specimen_TestType]    Script Date: 11/19/2013 7:44:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Specimen_TestType](
	[SpecimenTypeCode] [varchar](6) NOT NULL,
	[TestTypeCode] [varchar](6) NOT NULL,
 CONSTRAINT [PK_Specimen_TestType] PRIMARY KEY CLUSTERED 
(
	[SpecimenTypeCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Specimen_TestType]  WITH CHECK ADD  CONSTRAINT [FK_Specimen_TestType_SpecimenType] FOREIGN KEY([SpecimenTypeCode])
REFERENCES [dbo].[SpecimenType] ([TypeCode])
GO

ALTER TABLE [dbo].[Specimen_TestType] CHECK CONSTRAINT [FK_Specimen_TestType_SpecimenType]
GO

