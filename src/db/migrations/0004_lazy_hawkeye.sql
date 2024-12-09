ALTER TABLE "subjects" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "subjects" DROP COLUMN IF EXISTS "start";--> statement-breakpoint
ALTER TABLE "subjects" DROP COLUMN IF EXISTS "end";