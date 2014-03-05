USE [Daylight]
GO

/****** Object:  Table [dbo].[Appointment]    Script Date: 11/18/2013 6:31:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Appointment](
	[AppointmentId] [uniqueidentifier] NOT NULL,
	[StatusCode] [varchar](6) NOT NULL,
	[PatientId] [uniqueidentifier] NOT NULL,
	[StaffId] [uniqueidentifier] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[AppointmentEndDateTime] [datetime] NOT NULL,
	[Details] [varchar](max) NULL,
 CONSTRAINT [PK_Appointment] PRIMARY KEY CLUSTERED 
(
	[AppointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

