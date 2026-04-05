-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VOCAB', 'GRAMMAR', 'SENTENCE', 'PHRASE', 'ALPHABET');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('MORNING', 'EVENING');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETE');

-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('LOCKED', 'ACTIVE', 'COMPLETE');

-- CreateTable
CREATE TABLE "Learner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "levelCurrent" INTEGER NOT NULL DEFAULT 1,
    "whyMotivation" TEXT,
    "stakesStatement" TEXT,
    "accountabilityEmail" TEXT,
    "morningSessionTime" TEXT,
    "eveningSessionTime" TEXT,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "batmanModeActive" BOOLEAN NOT NULL DEFAULT false,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "rank" TEXT NOT NULL DEFAULT 'Rookie',
    "brainCompoundPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastActiveDt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "module" INTEGER NOT NULL,
    "groupName" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "english" TEXT NOT NULL,
    "urduRoman" TEXT NOT NULL,
    "audioUrl" TEXT,
    "exampleSentence" TEXT NOT NULL,
    "isPowerPack" BOOLEAN NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SRQueueItem" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "intervalDays" INTEGER NOT NULL DEFAULT 1,
    "nextReviewDate" TIMESTAMP(3) NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "correctCount" INTEGER NOT NULL DEFAULT 0,
    "incorrectCount" INTEGER NOT NULL DEFAULT 0,
    "isKnowledgeGap" BOOLEAN NOT NULL DEFAULT false,
    "lastReviewedAt" TIMESTAMP(3),

    CONSTRAINT "SRQueueItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissionSession" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "type" "SessionType" NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "feynmanScore" DOUBLE PRECISION,
    "feynmanText" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissionSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelProgress" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "module" INTEGER NOT NULL,
    "status" "ModuleStatus" NOT NULL DEFAULT 'LOCKED',
    "gateScore" DOUBLE PRECISION,
    "gateAttempts" INTEGER NOT NULL DEFAULT 0,
    "unlockedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "LevelProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "badgeType" TEXT NOT NULL,
    "module" INTEGER,
    "earnedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeynmanResponse" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "missionId" TEXT NOT NULL,
    "module" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "responseText" TEXT,
    "clarityScore" DOUBLE PRECISION,
    "vocabScore" DOUBLE PRECISION,
    "relevanceScore" DOUBLE PRECISION,
    "knowledgeGapItems" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeynmanResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" TEXT NOT NULL,
    "learnerId" TEXT NOT NULL,
    "week" TEXT NOT NULL,
    "module" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "responseText" TEXT NOT NULL,
    "clarityScore" DOUBLE PRECISION NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL,
    "upvoteCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Learner_email_key" ON "Learner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SRQueueItem_learnerId_itemId_key" ON "SRQueueItem"("learnerId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "LevelProgress_learnerId_level_module_key" ON "LevelProgress"("learnerId", "level", "module");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "SRQueueItem" ADD CONSTRAINT "SRQueueItem_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SRQueueItem" ADD CONSTRAINT "SRQueueItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissionSession" ADD CONSTRAINT "MissionSession_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelProgress" ADD CONSTRAINT "LevelProgress_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeynmanResponse" ADD CONSTRAINT "FeynmanResponse_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeynmanResponse" ADD CONSTRAINT "FeynmanResponse_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "MissionSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
