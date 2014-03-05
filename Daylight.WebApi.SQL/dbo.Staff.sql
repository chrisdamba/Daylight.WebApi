USE [Daylight]
GO

/****** Object:  Table [dbo].[Staff]    Script Date: 11/19/2013 7:44:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Staff](
	[StaffId] [uniqueidentifier] NOT NULL,
	[StaffCategoryCode] [varchar](6) NOT NULL,
	[RoleCode] [varchar](6) NOT NULL,
	[Gender] [varchar](2) NOT NULL,
	[Qualifications] [varchar](255) NULL,
	[DateOfBirth] [smalldatetime] NOT NULL,
	[Extension] [xml] NULL,
	[AddressId] [uniqueidentifier] NOT NULL,
	[NameId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Staff] PRIMARY KEY CLUSTERED 
(
	[StaffId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Staff]  WITH CHECK ADD  CONSTRAINT [FK_Staff_Address] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Address] ([AddressId])
GO

ALTER TABLE [dbo].[Staff] CHECK CONSTRAINT [FK_Staff_Address]
GO

ALTER TABLE [dbo].[Staff]  WITH CHECK ADD  CONSTRAINT [FK_Staff_Role] FOREIGN KEY([RoleCode])
REFERENCES [dbo].[Role] ([Code])
GO

ALTER TABLE [dbo].[Staff] CHECK CONSTRAINT [FK_Staff_Role]
GO

ALTER TABLE [dbo].[Staff]  WITH CHECK ADD  CONSTRAINT [FK_Staff_StaffCategories] FOREIGN KEY([StaffCategoryCode])
REFERENCES [dbo].[StaffCategories] ([Code])
GO

ALTER TABLE [dbo].[Staff] CHECK CONSTRAINT [FK_Staff_StaffCategories]
GO

