export interface Student {
  id?: number;
  student_id?: string;
  study_groups_id?: string;
  nisn?: string;
  nipd?: string;
  nik?: string;
  rfid?: string;
  gender?: string;
  email?: string;
  name?: string;
  DoB?: Date | string;
  PoB?: string;
  starting_school_years_id?: string;
  user_id?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
