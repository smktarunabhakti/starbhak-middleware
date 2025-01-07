ALTER TABLE "study_group_schedule" RENAME TO "study_group_schedules";--> statement-breakpoint
ALTER TABLE "study_group_schedules" DROP CONSTRAINT "study_group_schedule_study_groups_id_study_groups_study_groups_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_group_schedules" ADD CONSTRAINT "study_group_schedules_study_groups_id_study_groups_study_groups_id_fk" FOREIGN KEY ("study_groups_id") REFERENCES "public"."study_groups"("study_groups_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
