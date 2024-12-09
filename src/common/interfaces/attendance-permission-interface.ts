export interface AttendancePermission {
    id?: number,
    student_id?: string,
    date?: string | Date,
    type?: 'IZIN' | "SAKIT" | "ALPHA",
    status?: "ACCEPTED" | "DENIED" | "PENDING",
    teacher_id?: string,
    isActive?: boolean, 
    createdAt?: Date,
    updatedAt?: Date
}