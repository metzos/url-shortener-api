/*
  Warnings:

  - You are about to drop the `ShortUrl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ShortUrl";

-- CreateTable
CREATE TABLE "UrlEntry" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UrlEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlEntry_shortCode_key" ON "UrlEntry"("shortCode");
