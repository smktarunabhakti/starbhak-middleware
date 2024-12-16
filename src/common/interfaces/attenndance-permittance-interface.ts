export type typeEnum = "IZIN" | "SAKIT" | "ALPHA"
export type statusEnum = "ACCEPTED" | "DENIED" | "PENDING"

export interface AttenndancePermittance{
    id: number,
    student_id: string,
    description: string,
    date: string | Date,
    type: typeEnum,
    status: statusEnum,
    teacher_id: string,
    isActive: boolean,
    createdAt: string | Date,
    updatedAt: string | Date
}