export interface AcademicCalendar {
    id?: number,
    academic_calendars_id?: string,
    name?: string,
    start_date?: string | Date,
    end_date?: string | Date,
    location?: string,
    is_holiday?: boolean,
    is_celebrated_at_school?: boolean,
    start_at?: string,
    end_at?: string,
    isActive?: boolean, 
    createdAt?: Date,
    updatedAt?: Date
}