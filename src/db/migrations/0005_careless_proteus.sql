CREATE TYPE "public"."attendancePermittanceStatus" AS ENUM('ACCEPTED', 'DENIED', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."attendancePermittanceType" AS ENUM('IZIN', 'SAKIT', 'ALPHA');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attendance_permittance" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attendance_permittance_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" uuid,
	"description" text,
	"date" date,
	"type" "attendancePermittanceType",
	"status" "attendancePermittanceStatus",
	"teacher_id" uuid,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attendance_records" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "attendance_records_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" uuid,
	"date" date,
	"clock_in" time,
	"scheduled_clock_in" time,
	"clock_out" time,
	"scheduled_clock_out" time,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "academic_calendars" ADD COLUMN "name" varchar;--> statement-breakpoint
ALTER TABLE "academic_calendars" ADD COLUMN "start_date" date;--> statement-breakpoint
ALTER TABLE "academic_calendars" ADD COLUMN "end_date" date;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "dob" date;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "pob" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance_permittance" ADD CONSTRAINT "attendance_permittance_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "academic_calendars" DROP COLUMN IF EXISTS "date";