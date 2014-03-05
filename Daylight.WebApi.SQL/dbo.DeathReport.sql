USE [Daylight]
GO

/****** Object:  Table [dbo].[DeathReport]    Script Date: 11/18/2013 6:47:01 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[DeathReport](
	[Id] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[DateOfDeath] [datetime] NULL,
	[Report] [varchar](max) NULL,
 CONSTRAINT [PK_DeathReport] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[DeathReport]  WITH CHECK ADD  CONSTRAINT [FK_DeathReport_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[DeathReport] CHECK CONSTRAINT [FK_DeathReport_Patient]
GO

