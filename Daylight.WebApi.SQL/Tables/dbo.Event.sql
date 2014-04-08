USE [Daylight]
GO

IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Event_EventId]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Event] DROP CONSTRAINT [DF_Event_EventId]
END

GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Event]    Script Date: 04/08/2014 22:01:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Event]') AND type in (N'U'))
DROP TABLE [dbo].[Event]
GO

USE [Daylight]
GO

/****** Object:  Table [dbo].[Event]    Script Date: 04/08/2014 22:01:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Event](
	[EventId] [uniqueidentifier] NOT NULL,
	[Title] [varchar](255) NOT NULL,
	[Description] [varchar](max) NULL,
	[Location] [varchar](max) NULL,
	[Colour] [varchar](50) NULL,
	[Start] [datetime] NOT NULL,
	[End] [datetime] NOT NULL,
	[AllDay] [bit] NOT NULL,
	[Icon] [varchar](50) NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Event] ADD  CONSTRAINT [DF_Event_EventId]  DEFAULT (newid()) FOR [EventId]
GO

