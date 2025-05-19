ALTER TABLE "teachers" ALTER COLUMN "teacher_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "teacher_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "teacher_id" SET NOT NULL;