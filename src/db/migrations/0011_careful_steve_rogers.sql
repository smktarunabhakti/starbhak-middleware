ALTER TABLE "schedules" DROP CONSTRAINT "schedules_teacher_id_teachers_teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "study_groups" DROP CONSTRAINT "study_groups_homeroom_teacher_id_teachers_teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "study_groups" DROP CONSTRAINT "study_groups_counseling_teacher_id_teachers_teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "schedules" ALTER COLUMN "teacher_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "study_groups" ALTER COLUMN "homeroom_teacher_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "study_groups" ALTER COLUMN "counseling_teacher_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "teacher_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "teacher_id" DROP DEFAULT;