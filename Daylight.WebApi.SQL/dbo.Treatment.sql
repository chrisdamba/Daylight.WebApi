USE [Daylight]
GO

/****** Object:  Table [dbo].[Treatment]    Script Date: 11/18/2013 6:53:49 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Treatment](
	[TreatmentId] [uniqueidentifier] NOT NULL,
	[MedicationCode] [varchar](6) NOT NULL,
	[SurgeryCode] [varchar](6) NULL,
	[Type] [varchar](6) NOT NULL,
	[Cost] [money] NULL,
	[Extension] [xml] NULL,
 CONSTRAINT [PK_Treatment] PRIMARY KEY CLUSTERED 
(
	[TreatmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Treatment]  WITH CHECK ADD  CONSTRAINT [FK_Treatment_Treatment] FOREIGN KEY([TreatmentId])
REFERENCES [dbo].[Treatment] ([TreatmentId])
GO

ALTER TABLE [dbo].[Treatment] CHECK CONSTRAINT [FK_Treatment_Treatment]
GO

