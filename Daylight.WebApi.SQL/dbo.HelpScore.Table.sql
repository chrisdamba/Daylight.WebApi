USE [Daylight]
GO
/****** Object:  Table [dbo].[HelpScore]    Script Date: 11/20/2013 7:02:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HelpScore](
	[Score] [tinyint] NOT NULL,
 CONSTRAINT [PK_HelpScore] PRIMARY KEY CLUSTERED 
(
	[Score] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
