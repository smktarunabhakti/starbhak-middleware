export interface AttendanceRecords {
    id?: number,
    student_id?: string,
    date?: string | Date,
    clock_in?: string,
    scheduled_clock_in?: string,
    clock_out?: string,
    scheduled_clock_out?: string,
    isActive?: boolean, 
    createdAt?: Date,
    updatedAt?: Date
}