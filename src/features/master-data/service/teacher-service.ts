import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import type { Teacher } from "../../../common/interfaces/teacher-interface";
import { getAllTeachers, getTeacherById, getTeacherByUuid, createTeacher, updateTeacher, deleteTeacher } from "../../../common/model/teacher-model";

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
      data: {
        errors: error,
      },
    };
  }
};

const fetchTeacherById = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const collection = await getTeacherById(id);
    return {
      success: true,
      message: `Success fetched teacher with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching teacher data with id:${id}!`,
      data: {
        errors: error,
      },
    };
  }
};

const fetchTeacherByUuid = async (
  uuid: string
): Promise<ServiceResponse> => {
  try {
    const collection = await getTeacherByUuid(uuid);
    return {
      success: true,
      message: `Success fetched teacher with UUID:${uuid}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching teacher data with UUID:${uuid}!`,
      data: {
        errors: error,
      },
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
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding teacher!",
      data: {
        errors: error,
      },
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
    updatedAt?: Date;
  }
): Promise<ServiceResponse> => {
  try {
    const updatedTeacher = await updateTeacher(uuid, updateData);
    return {
      success: true,
      message: `Teacher with UUID:${uuid} updated successfully!`,
      data: updatedTeacher,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating teacher with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

const removeTeacher = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const deletedTeacher = await deleteTeacher(uuid);
    return {
      success: true,
      message: `Teacher with UUID:${uuid} deleted successfully!`,
      data: deletedTeacher,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting teacher with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

export default {
    fetchTeachers,
    fetchTeacherById,
    fetchTeacherByUuid,
    createTeacher,
    updateTeacher,
    deleteTeacher
}