import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import type { Subject } from "../../../common/interfaces/subject-interface";
import { getAllSubjects, getSubjectById, getSubjectByUuid, createSubject, updateSubject, deleteSubject } from "../../../common/model/subject-model";

const fetchSubjects = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllSubjects();
    return {
      success: true,
      message: "Success fetched subjects data!",
      data: collections as Subject[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching subjects data!",
      data: {
        errors: error,
      },
    };
  }
};

const fetchSubjectById = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const collection = await getSubjectById(id);
    return {
      success: true,
      message: `Success fetched subject with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching subject data with id:${id}!`,
      data: {
        errors: error,
      },
    };
  }
};

const fetchSubjectByUuid = async (
  uuid: string
): Promise<ServiceResponse> => {
  try {
    const collection = await getSubjectByUuid(uuid);
    return {
      success: true,
      message: `Success fetched subject with UUID:${uuid}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching subject data with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

const addSubject = async (subjectData: {
  name: string;
  isActive: boolean;
}): Promise<ServiceResponse> => {
  try {
    const createdSubject = await createSubject(subjectData);
    return {
      success: true,
      message: "Subject added successfully!",
      data: createdSubject,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding subject!",
      data: {
        errors: error,
      },
    };
  }
};

const editSubject = async (
  uuid: string,
  updateData: {
    name?: string;
    isActive?: boolean;
  }
): Promise<ServiceResponse> => {
  try {
    const updatedSubject = await updateSubject(uuid, updateData);
    return {
      success: true,
      message: `Subject with UUID:${uuid} updated successfully!`,
      data: updatedSubject,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating subject with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

const removeSubject = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const deletedSubject = await deleteSubject(uuid);
    return {
      success: true,
      message: `Subject with UUID:${uuid} deleted successfully!`,
      data: deletedSubject,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting subject with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

export default {
  fetchSubjects,
  fetchSubjectById,
  fetchSubjectByUuid,
  createSubject,
  updateSubject,
  deleteSubject
}
