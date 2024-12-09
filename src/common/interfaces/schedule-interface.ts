export interface Schedule {
    id: number,
    schedules_id?: string,
    teacher_id?: string,
    subject_id?: string,
    study_group_id?: string,
    name: string,
    isActive: boolean, 
    createdAt?: Date,
    updatedAt?: Date
}