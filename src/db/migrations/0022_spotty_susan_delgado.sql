CREATE TABLE IF NOT EXISTS "study_group_schedule" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "study_group_schedule_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"study_groups_id" uuid,
	"day_of_week" integer NOT NULL,
	"start_at" time NOT NULL,
	"end_at" time NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "study_group_schedule" ADD CONSTRAINT "study_group_schedule_study_groups_id_study_groups_study_groups_id_fk" FOREIGN KEY ("study_groups_id") REFERENCES "public"."study_groups"("study_groups_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
