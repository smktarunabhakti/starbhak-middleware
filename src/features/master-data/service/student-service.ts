import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import type { Student } from "../../../common/interfaces/student-interface";
import {
  getAllStudents,
  getStudentById,
  getStudentByUuid,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../../common/model/student-model";

const fetchStudents = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllStudents();

    return {
      success: true,
      message: "Success fetched students data!",
      data: collections as Student[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching students data!",
      data: { errors: error },
    };
  }
};

const fetchStudentById = async (id: number): Promise<ServiceResponse> => {
  try {
    const collection = await getStudentById(id);
    if (!collection) {
      return {
        success: false,
        message: `Cannot find student with id:${id}!`,
        statusCode: 404,
      };
    }
    return {
      success: true,
      message: `Success fetched student with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching student data with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const fetchStudentByUuid = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const collection = await getStudentByUuid(uuid);
    if (!collection) {
      return {
        success: false,
        message: `Cannot find student with uuid:${uuid}!`,
        statusCode: 404,
      };
    }
    return {
      success: true,
      message: `Success fetched student with UUID:${uuid}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching student data with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addStudent = async (studentData: {
  nisn: string;
  nipd: string;
  nik: string;
  rfid: string;
  name: string;
  DoB: Date | string;
  PoB: string;
  gender: string;
  email: string;
  starting_school_years_id: string;
  isActive: boolean;
}): Promise<ServiceResponse> => {
  try {
    console.log("Student data: ", studentData);
    
    const createdStudent = await createStudent(studentData);
    return {
      success: true,
      message: "Student added successfully!",
      data: createdStudent,
      statusCode: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding student!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const editStudent = async (
  uuid: string,
  updateData: {
    nisn?: string;
    nipd?: string;
    nik?: string;
    rfid?: string;
    name?: string;
    DoB?: Date | string;
    PoB?: string;
    gender?: string;
    email?: string;
    starting_school_years_id?: string;
    isActive?: boolean;
  }
): Promise<ServiceResponse> => {
  
  try {
    console.info("[Service] updateData: ", updateData)

    const existingStudent = await getStudentByUuid(uuid);
    console.info("[Service] existingStudent: ", existingStudent)

    if (!existingStudent) {
      return {
        success: false,
        message: `Student with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const updatedStudent = await updateStudent(uuid, updateData);
    console.info("[Service] updatedStudent: ", updatedStudent);

    return {
      success: true,
      message: `Student with UUID:${uuid} updated successfully!`,
      data: updatedStudent,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating student with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const removeStudent = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const existingStudent = await getStudentByUuid(uuid);
    if (!existingStudent) {
      return {
        success: false,
        message: `Student with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const deletedStudent = await deleteStudent(uuid);
    return {
      success: true,
      message: `Student with UUID:${uuid} deleted successfully!`,
      data: deletedStudent,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting student with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

export {
  fetchStudents,
  fetchStudentById,
  fetchStudentByUuid,
  addStudent,
  editStudent,
  removeStudent,
};
