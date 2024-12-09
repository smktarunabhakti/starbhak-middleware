ALTER TABLE "students" ADD COLUMN "study_groups_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_study_groups_id_study_groups_study_groups_id_fk" FOREIGN KEY ("study_groups_id") REFERENCES "public"."study_groups"("study_groups_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
