CREATE TABLE IF NOT EXISTS "parent_student" (
	"parent_id" uuid,
	"student_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parent_student" ADD CONSTRAINT "parent_student_parent_id_parents_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("parent_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parent_student" ADD CONSTRAINT "parent_student_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
