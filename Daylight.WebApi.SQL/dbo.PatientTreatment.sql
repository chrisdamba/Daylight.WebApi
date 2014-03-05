USE [Daylight]
GO

/****** Object:  Table [dbo].[PatientTreatment]    Script Date: 11/19/2013 7:43:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PatientTreatment](
	[PatientId] [uniqueidentifier] NOT NULL,
	[TreatmentId] [uniqueidentifier] NOT NULL,
	[DateOfTreatment] [datetime] NOT NULL,
	[HelpScore] [tinyint] NULL,
	[SideEffectCode] [tinyint] NULL,
	[Extension] [xml] NULL,
 CONSTRAINT [PK_PatientTreatment] PRIMARY KEY CLUSTERED 
(
	[TreatmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[PatientTreatment] ADD  CONSTRAINT [DF_PatientTreatment_DateOfTreatment]  DEFAULT (getdate()) FOR [DateOfTreatment]
GO

ALTER TABLE [dbo].[PatientTreatment]  WITH CHECK ADD  CONSTRAINT [FK_PatientTreatment_HelpScore] FOREIGN KEY([HelpScore])
REFERENCES [dbo].[HelpScore] ([Score])
GO

ALTER TABLE [dbo].[PatientTreatment] CHECK CONSTRAINT [FK_PatientTreatment_HelpScore]
GO

ALTER TABLE [dbo].[PatientTreatment]  WITH CHECK ADD  CONSTRAINT [FK_PatientTreatment_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO

ALTER TABLE [dbo].[PatientTreatment] CHECK CONSTRAINT [FK_PatientTreatment_Patient]
GO

ALTER TABLE [dbo].[PatientTreatment]  WITH CHECK ADD  CONSTRAINT [FK_PatientTreatment_SideEffectScore] FOREIGN KEY([SideEffectCode])
REFERENCES [dbo].[SideEffectScore] ([Score])
GO

ALTER TABLE [dbo].[PatientTreatment] CHECK CONSTRAINT [FK_PatientTreatment_SideEffectScore]
GO

