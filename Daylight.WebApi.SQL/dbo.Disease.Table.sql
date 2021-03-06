USE [Daylight]
GO
/****** Object:  Table [dbo].[Disease]    Script Date: 11/20/2013 7:02:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Disease](
	[DiseaseId] [uniqueidentifier] NOT NULL,
	[ShortName] [varchar](255) NOT NULL,
	[LatinName] [varchar](255) NOT NULL,
	[CommonSymptoms] [varchar](max) NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[Extension] [xml] NULL,
 CONSTRAINT [PK_Disease] PRIMARY KEY CLUSTERED 
(
	[DiseaseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
