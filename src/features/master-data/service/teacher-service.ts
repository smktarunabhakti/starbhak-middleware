import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import type { Teacher } from "../../../common/interfaces/teacher-interface";
import {
  getAllTeachers,
  getTeacherById,
  getTeacherByUuid,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../../common/model/teacher-model";

const fetchTeachers = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllTeachers();
    return {
      success: true,
      message: "Success fetched teachers data!",
      data: collections as Teacher[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching teachers data!",
      data: { errors: error },
    };
  }
};

const fetchTeacherById = async (id: number): Promise<ServiceResponse> => {
  try {
    const collection = await getTeacherById(id);
    if (!collection) {
      return {
        success: false,
        message: `Cannot find teacher with id:${id}!`,
        statusCode: 404,
      };
    }
    return {
      success: true,
      message: `Success fetched teacher with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching teacher data with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const fetchTeacherByUuid = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const collection = await getTeacherByUuid(uuid);
    if (!collection) {
      return {
        success: false,
        message: `Cannot find teacher with uuid:${uuid}!`,
        statusCode: 404,
      };
    }
    return {
      success: true,
      message: `Success fetched teacher with UUID:${uuid}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching teacher data with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addTeacher = async (teacherData: {
  name: string;
  DoB: Date | string;
  PoB: string;
  gender: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}): Promise<ServiceResponse> => {
  try {
    const createdTeacher = await createTeacher(teacherData);
    return {
      success: true,
      message: "Teacher added successfully!",
      data: createdTeacher,
      statusCode: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding teacher!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const editTeacher = async (
  uuid: string,
  updateData: {
    name?: string;
    DoB?: Date | string;
    PoB?: string;
    gender?: string;
    email?: string;
    isActive?: boolean;
  }
): Promise<ServiceResponse> => {
  try {
    const existingTeacher = await getTeacherByUuid(uuid);
    if (!existingTeacher) {
      return {
        success: false,
        message: `Teacher with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const updatedTeacher = await updateTeacher(uuid, updateData);
    return {
      success: true,
      message: `Teacher with UUID:${uuid} updated successfully!`,
      data: updatedTeacher,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating teacher with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const removeTeacher = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const existingTeacher = await getTeacherByUuid(uuid);
    if (!existingTeacher) {
      return {
        success: false,
        message: `Teacher with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const deletedTeacher = await deleteTeacher(uuid);
    return {
      success: true,
      message: `Teacher with UUID:${uuid} deleted successfully!`,
      data: deletedTeacher,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting teacher with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

export {
  fetchTeachers,
  fetchTeacherById,
  fetchTeacherByUuid,
  addTeacher,
  editTeacher,
  removeTeacher,
};
