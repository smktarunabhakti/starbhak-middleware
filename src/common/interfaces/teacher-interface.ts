export interface Teacher {
    id?: number,
    teacher_id?: string,
    name?: string,
    DoB?: Date | string,
    PoB?: string,
    gender?: string,
    email?: string,
    isActive?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}