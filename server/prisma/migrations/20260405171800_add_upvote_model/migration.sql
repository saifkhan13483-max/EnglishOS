-- CreateTable
CREATE TABLE "Upvote" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upvote_learnerId_entryId_key" ON "Upvote"("learnerId", "entryId");

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "LeaderboardEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
