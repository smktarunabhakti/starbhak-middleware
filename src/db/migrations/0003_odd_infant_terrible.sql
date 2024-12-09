ALTER TABLE "majors" DROP CONSTRAINT "majors_majors_head_id_teachers_teacher_id_fk";
--> statement-breakpoint
ALTER TABLE "majors" ADD COLUMN "name" varchar NOT NULL;