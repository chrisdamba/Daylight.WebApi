USE [Daylight]
GO

/****** Object:  Table [dbo].[Test]    Script Date: 11/19/2013 7:45:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Test](
	[TestId] [uniqueidentifier] NOT NULL,
	[SpecimenId] [uniqueidentifier] NOT NULL,
	[TypeCode] [varchar](6) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[Results] [varchar](max) NULL,
	[Extension] [xml] NULL,
 CONSTRAINT [PK_Test] PRIMARY KEY CLUSTERED 
(
	[TestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Test] ADD  CONSTRAINT [DF_Test_DateCreated]  DEFAULT (getdate()) FOR [DateCreated]
GO

ALTER TABLE [dbo].[Test]  WITH CHECK ADD  CONSTRAINT [FK_Test_Specimen] FOREIGN KEY([SpecimenId])
REFERENCES [dbo].[Specimen] ([SpecimenId])
GO

ALTER TABLE [dbo].[Test] CHECK CONSTRAINT [FK_Test_Specimen]
GO

ALTER TABLE [dbo].[Test]  WITH CHECK ADD  CONSTRAINT [FK_Test_TestType] FOREIGN KEY([TypeCode])
REFERENCES [dbo].[TestType] ([TypeCode])
GO

ALTER TABLE [dbo].[Test] CHECK CONSTRAINT [FK_Test_TestType]
GO

