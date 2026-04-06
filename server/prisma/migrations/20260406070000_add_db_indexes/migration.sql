-- CreateIndex
CREATE INDEX "SRQueueItem_learnerId_nextReviewDate_idx" ON "SRQueueItem"("learnerId", "nextReviewDate");

-- CreateIndex
CREATE INDEX "MissionSession_learnerId_sessionDate_type_idx" ON "MissionSession"("learnerId", "sessionDate", "type");
