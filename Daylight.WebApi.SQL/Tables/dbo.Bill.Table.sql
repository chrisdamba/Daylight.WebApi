﻿CREATE TABLE [dbo].[Bill] (
    [BillId]  UNIQUEIDENTIFIER CONSTRAINT [DF_Bill_BillId] DEFAULT (newid()) NOT NULL,
    [DueDate] DATETIME         NULL,
    [Amount]  MONEY            NOT NULL,
    [Details] VARCHAR (MAX)    NULL,
    CONSTRAINT [PK_PatientBill] PRIMARY KEY CLUSTERED ([BillId] ASC)
);


GO

CREATE INDEX [IX_Bill_Column] ON [dbo].[Bill] ([Column])
