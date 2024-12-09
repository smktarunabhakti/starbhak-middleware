export interface Student {
    id?: number,
    teacher_id?: string,
    nisn?: string,
    nipd?: string,
    nik?: string,
    rfid?: string,
    name?: string,
    DoB?: Date | string,
    PoB?: string,
    gender?: string,
    email?: string,
    starting_school_years_id?: string,
    isActive?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}