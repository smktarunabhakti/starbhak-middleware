CREATE TABLE IF NOT EXISTS "academic_calendars" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "academic_calendars_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"academic_calendars_id" uuid DEFAULT gen_random_uuid(),
	"date" date,
	"location" varchar,
	"is_holiday" boolean DEFAULT false NOT NULL,
	"is_celebrated_at_school" boolean DEFAULT false NOT NULL,
	"start_at" time,
	"end_at" time,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "academic_calendars_academic_calendars_id_unique" UNIQUE("academic_calendars_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "majors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "majors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"majors_id" uuid DEFAULT gen_random_uuid(),
	"majors_head_id" uuid,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "majors_majors_id_unique" UNIQUE("majors_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedules" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "schedules_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"schedules_id" uuid DEFAULT gen_random_uuid(),
	"teacher_id" uuid,
	"subject_id" uuid,
	"study_group_id" uuid,
	"day_of_week" integer NOT NULL,
	"start_at" time NOT NULL,
	"end_at" time NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "schedules_schedules_id_unique" UNIQUE("schedules_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subjects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"subjects_id" uuid DEFAULT gen_random_uuid(),
	"start" integer NOT NULL,
	"end" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "subjects_subjects_id_unique" UNIQUE("subjects_id")
);
--> statement-breakpoint
ALTER TABLE "students" RENAME COLUMN "starting_school_years" TO "starting_school_years_id";--> statement-breakpoint
ALTER TABLE "study_groups" RENAME COLUMN "starting_school_years" TO "starting_school_years_id";--> statement-breakpoint
ALTER TABLE "students" DROP CONSTRAINT "students_starting_school_years_school_years_school_year_id_fk";
--> statement-breakpoint
ALTER TABLE "study_groups" DROP CONSTRAINT "study_groups_starting_school_years_school_years_school_year_id_fk";
--> statement-breakpoint
ALTER TABLE "study_groups" ADD COLUMN "counseling_teacher_id" uuid;--> statement-breakpoint
ALTER TABLE "study_groups" ADD COLUMN "major_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "majors" ADD CONSTRAINT "majors_majors_head_id_teachers_teacher_id_fk" FOREIGN KEY ("majors_head_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedules" ADD CONSTRAINT "schedules_teacher_id_teachers_teacher_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedules" ADD CONSTRAINT "schedules_subject_id_subjects_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("subjects_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedules" ADD CONSTRAINT "schedules_study_group_id_study_groups_study_groups_id_fk" FOREIGN KEY ("study_group_id") REFERENCES "public"."study_groups"("study_groups_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_starting_school_years_id_school_years_school_year_id_fk" FOREIGN KEY ("starting_school_years_id") REFERENCES "public"."school_years"("school_year_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_groups" ADD CONSTRAINT "study_groups_starting_school_years_id_school_years_school_year_id_fk" FOREIGN KEY ("starting_school_years_id") REFERENCES "public"."school_years"("school_year_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_groups" ADD CONSTRAINT "study_groups_counseling_teacher_id_teachers_teacher_id_fk" FOREIGN KEY ("counseling_teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_groups" ADD CONSTRAINT "study_groups_major_id_majors_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("majors_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
