USE [Daylight]
GO
/****** Object:  ForeignKey [FK_Condition_Patient]    Script Date: 03/24/2014 22:20:07 ******/
ALTER TABLE [dbo].[Condition] DROP CONSTRAINT [FK_Condition_Patient]
GO
/****** Object:  ForeignKey [FK_Medication_Condition]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Medication] DROP CONSTRAINT [FK_Medication_Condition]
GO
/****** Object:  ForeignKey [FK_Vitals_Patient]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Vitals] DROP CONSTRAINT [FK_Vitals_Patient]
GO
/****** Object:  Table [dbo].[Medication]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Medication] DROP CONSTRAINT [FK_Medication_Condition]
GO
DROP TABLE [dbo].[Medication]
GO
/****** Object:  Table [dbo].[Condition]    Script Date: 03/24/2014 22:20:07 ******/
ALTER TABLE [dbo].[Condition] DROP CONSTRAINT [FK_Condition_Patient]
GO
ALTER TABLE [dbo].[Condition] DROP CONSTRAINT [DF_Condition_ConditionId]
GO
DROP TABLE [dbo].[Condition]
GO
/****** Object:  Table [dbo].[Vitals]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Vitals] DROP CONSTRAINT [FK_Vitals_Patient]
GO
ALTER TABLE [dbo].[Vitals] DROP CONSTRAINT [DF_Vitals_ObservationId]
GO
DROP TABLE [dbo].[Vitals]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [DF_Patient_PatientId]
GO
ALTER TABLE [dbo].[Patient] DROP CONSTRAINT [DF_Patient_DateBecamePatient]
GO
DROP TABLE [dbo].[Patient]
GO
/****** Object:  Table [dbo].[User]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[User] DROP CONSTRAINT [DF_User_UserId]
GO
ALTER TABLE [dbo].[User] DROP CONSTRAINT [DF_User_DateCreated]
GO
ALTER TABLE [dbo].[User] DROP CONSTRAINT [DF_User_DateModified]
GO
DROP TABLE [dbo].[User]
GO
/****** Object:  Table [dbo].[User]    Script Date: 03/24/2014 22:20:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [uniqueidentifier] NOT NULL CONSTRAINT [DF_User_UserId]  DEFAULT (newid()),
	[UserName] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[FirstName] [varchar](255) NOT NULL,
	[LastName] [varchar](255) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL CONSTRAINT [DF_User_DateCreated]  DEFAULT (getdate()),
	[DateModified] [datetime2](7) NOT NULL CONSTRAINT [DF_User_DateModified]  DEFAULT (getdate()),
	[IsActive] [bit] NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[IsLockedOut] [bit] NOT NULL,
	[PasswordExpired] [bit] NOT NULL,
	[PasswordFailuresSinceLastSuccess] [int] NOT NULL,
	[LastPasswordFailureDate] [datetime2](7) NULL,
	[LastActivityDate] [datetime2](7) NULL,
	[LastLockoutDate] [datetime2](7) NULL,
	[LastLoginDate] [datetime2](7) NULL,
	[ConfirmationToken] [varchar](max) NULL,
	[LastPasswordChangedDate] [datetime2](7) NULL,
	[PasswordVerificationToken] [varchar](max) NULL,
	[PasswordVerificationTokenExpirationDate] [datetime2](7) NULL,
	[Comment] [varchar](max) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
CREATE NONCLUSTERED INDEX [IX_User] ON [dbo].[User] 
(
	[UserName] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_User_UserName] ON [dbo].[User] 
(
	[UserName] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 03/24/2014 22:20:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientId] [uniqueidentifier] NOT NULL CONSTRAINT [DF_Patient_PatientId]  DEFAULT (newid()),
	[IsDeleted] [bit] NOT NULL,
	[Gender] [char](1) NOT NULL,
	[RelationshipStatus] [varchar](10) NULL,
	[DateOfBirth] [smalldatetime] NOT NULL,
	[DateBecamePatient] [datetime] NOT NULL CONSTRAINT [DF_Patient_DateBecamePatient]  DEFAULT (getdate()),
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Phone] [varchar](50) NULL,
	[Email] [varchar](100) NULL,
	[Address] [varchar](500) NULL,
 CONSTRAINT [PK_Patient] PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Vitals]    Script Date: 03/24/2014 22:20:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vitals](
	[ObservationId] [uniqueidentifier] NOT NULL CONSTRAINT [DF_Vitals_ObservationId]  DEFAULT (newid()),
	[PatientId] [uniqueidentifier] NOT NULL,
	[DateRecorded] [datetime2](7) NOT NULL,
	[Pulse] [float] NULL,
	[BloodGlucose] [float] NULL,
	[DiastolicBP] [smallint] NULL,
	[SystolicBP] [smallint] NULL,
	[BodyTemperature] [float] NULL,
	[Weight] [float] NULL,
	[Height] [float] NULL,
 CONSTRAINT [PK_Vitals] PRIMARY KEY CLUSTERED 
(
	[ObservationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Condition]    Script Date: 03/24/2014 22:20:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Condition](
	[ConditionId] [uniqueidentifier] NOT NULL CONSTRAINT [DF_Condition_ConditionId]  DEFAULT (newid()),
	[PatientId] [uniqueidentifier] NOT NULL,
	[StartedAt] [datetime] NOT NULL,
	[ConceptId] [int] NOT NULL,
	[FinishedAt] [datetime] NULL,
	[Name] [varchar](255) NULL,
 CONSTRAINT [PK_Condition] PRIMARY KEY CLUSTERED 
(
	[ConditionId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Medication]    Script Date: 03/24/2014 22:20:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Medication](
	[MedicationId] [uniqueidentifier] NOT NULL,
	[ConditionId] [uniqueidentifier] NOT NULL,
	[ConceptId] [int] NOT NULL,
	[Name] [varchar](255) NULL,
	[StartedAt] [datetime] NOT NULL,
	[FinishedAt] [datetime] NULL,
	[Cost] [money] NOT NULL,
 CONSTRAINT [PK_Medication] PRIMARY KEY CLUSTERED 
(
	[MedicationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_Condition_Patient]    Script Date: 03/24/2014 22:20:07 ******/
ALTER TABLE [dbo].[Condition]  WITH CHECK ADD  CONSTRAINT [FK_Condition_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[Condition] CHECK CONSTRAINT [FK_Condition_Patient]
GO
/****** Object:  ForeignKey [FK_Medication_Condition]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Medication]  WITH CHECK ADD  CONSTRAINT [FK_Medication_Condition] FOREIGN KEY([ConditionId])
REFERENCES [dbo].[Condition] ([ConditionId])
GO
ALTER TABLE [dbo].[Medication] CHECK CONSTRAINT [FK_Medication_Condition]
GO
/****** Object:  ForeignKey [FK_Vitals_Patient]    Script Date: 03/24/2014 22:20:08 ******/
ALTER TABLE [dbo].[Vitals]  WITH CHECK ADD  CONSTRAINT [FK_Vitals_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([PatientId])
GO
ALTER TABLE [dbo].[Vitals] CHECK CONSTRAINT [FK_Vitals_Patient]
GO
