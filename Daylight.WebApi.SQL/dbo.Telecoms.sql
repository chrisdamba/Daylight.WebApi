USE [Daylight]
GO

/****** Object:  Table [dbo].[Telecoms]    Script Date: 11/18/2013 6:53:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Telecoms](
	[Id] [uniqueidentifier] NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[TelecomType] [varchar](50) NOT NULL,
	[Use] [varchar](50) NULL,
	[Value] [varchar](255) NOT NULL,
	[PreferenceOrder] [smallint] NULL,
 CONSTRAINT [PK_Telecoms] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Telecoms] ADD  CONSTRAINT [DF_Telecoms_PatientId]  DEFAULT (newid()) FOR [PatientId]
GO

ALTER TABLE [dbo].[Telecoms]  WITH CHECK ADD  CONSTRAINT [FK_Telecoms_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[Telecoms] CHECK CONSTRAINT [FK_Telecoms_Patient]
GO

