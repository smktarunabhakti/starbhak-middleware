CREATE TYPE "public"."year" AS ENUM('X', 'XI', 'XII');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "school_years" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "school_years_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"school_year_id" uuid DEFAULT gen_random_uuid(),
	"start" integer NOT NULL,
	"end" integer NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "school_years_school_year_id_unique" UNIQUE("school_year_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "students_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" uuid DEFAULT gen_random_uuid(),
	"nisn" text,
	"nipd" text,
	"nik" text,
	"rfid" text,
	"gender" text,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"starting_school_years" uuid,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "students_student_id_unique" UNIQUE("student_id"),
	CONSTRAINT "students_nisn_unique" UNIQUE("nisn"),
	CONSTRAINT "students_nipd_unique" UNIQUE("nipd"),
	CONSTRAINT "students_nik_unique" UNIQUE("nik"),
	CONSTRAINT "students_rfid_unique" UNIQUE("rfid"),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "study_groups" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "study_groups_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"study_groups_id" uuid DEFAULT gen_random_uuid(),
	"starting_school_years" uuid,
	"name" text NOT NULL,
	"homeroom_teacher_id" uuid,
	"year" "year",
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "study_groups_study_groups_id_unique" UNIQUE("study_groups_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teachers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teachers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"teacher_id" uuid,
	"dob" date,
	"pob" text,
	"gender" text,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "teachers_teacher_id_unique" UNIQUE("teacher_id"),
	CONSTRAINT "teachers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_starting_school_years_school_years_school_year_id_fk" FOREIGN KEY ("starting_school_years") REFERENCES "public"."school_years"("school_year_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_groups" ADD CONSTRAINT "study_groups_starting_school_years_school_years_school_year_id_fk" FOREIGN KEY ("starting_school_years") REFERENCES "public"."school_years"("school_year_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_groups" ADD CONSTRAINT "study_groups_homeroom_teacher_id_teachers_teacher_id_fk" FOREIGN KEY ("homeroom_teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
