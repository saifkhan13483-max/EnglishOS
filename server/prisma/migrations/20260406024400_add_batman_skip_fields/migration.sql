-- AlterTable
ALTER TABLE "Learner" ADD COLUMN     "batmanModeWeekStart" TIMESTAMP(3),
ADD COLUMN     "batmanSkipUsedThisWeek" BOOLEAN NOT NULL DEFAULT false;
