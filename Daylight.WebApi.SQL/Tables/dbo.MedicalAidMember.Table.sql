USE [Daylight]
GO
/****** Object:  Table [dbo].[MedicalAidMember]    Script Date: 06/24/2014 20:31:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[MedicalAidMember](
	[MemberId] [uniqueidentifier] NOT NULL,
	[MedicalAidId] [uniqueidentifier] NOT NULL,
	[MembershipNumber] [varchar](255) NULL,
	[RelationshipToPatient] [varchar](50) NULL,
	[Name] [varchar](255) NULL,
	[Address] [varchar](max) NULL,
	[Phone] [varchar](50) NULL,
	[IdNumber] [varchar](20) NULL,
	[Employer] [varchar](max) NULL,
 CONSTRAINT [PK_MedicalAidMember] PRIMARY KEY CLUSTERED 
(
	[MemberId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[MedicalAidMember]  WITH CHECK ADD  CONSTRAINT [FK_MedicalAidMember_MedicalAid] FOREIGN KEY([MedicalAidId])
REFERENCES [dbo].[MedicalAid] ([MedicalAidId])
GO
ALTER TABLE [dbo].[MedicalAidMember] CHECK CONSTRAINT [FK_MedicalAidMember_MedicalAid]
GO
ALTER TABLE [dbo].[MedicalAidMember] ADD  CONSTRAINT [DF_MedicalAidMember_MemberId]  DEFAULT (newid()) FOR [MemberId]
GO
