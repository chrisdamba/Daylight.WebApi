USE [Daylight]
GO

/****** Object:  Table [dbo].[Specimen]    Script Date: 11/19/2013 7:44:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Specimen](
	[SpecimenId] [uniqueidentifier] NOT NULL,
	[Details] [varchar](max) NOT NULL,
	[TypeCode] [varchar](6) NOT NULL,
 CONSTRAINT [PK_Specimen] PRIMARY KEY CLUSTERED 
(
	[SpecimenId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Specimen]  WITH CHECK ADD  CONSTRAINT [FK_Specimen_SpecimenType] FOREIGN KEY([TypeCode])
REFERENCES [dbo].[SpecimenType] ([TypeCode])
GO

ALTER TABLE [dbo].[Specimen] CHECK CONSTRAINT [FK_Specimen_SpecimenType]
GO

