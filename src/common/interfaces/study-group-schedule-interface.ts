export interface StudyGroupSchedule {
    id?: number,
    study_groups_id?: string,
    starting_school_years_id?: string,
    name: string,
    homeroom_teacher_id?: string,
    counseling_teacher_id?: string,
    year?: "X" | "XI" | "XII",
    major_id?: string,
    isActive?: boolean, 
    createdAt?: Date,
    updatedAt?: Date
}