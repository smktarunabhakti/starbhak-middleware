import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import type { StudyGroupSchedule } from "../../../common/interfaces/study-group-schedule-interface";
import { getAllStudyGroups, getStudyGroupById, getStudyGroupByUuid, createStudyGroup, updateStudyGroup, deleteStudyGroup } from "../../../common/model/study-group-model";

const fetchStudyGroups = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllStudyGroups();
    return {
      success: true,
      message: "Success fetched study groups data!",
      data: collections as StudyGroupSchedule[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching study groups data!",
      data: {
        errors: error,
      },
    };
  }
};

const fetchStudyGroupById = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const collection = await getStudyGroupById(id);
    return {
      success: true,
      message: `Success fetched study group with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching study group data with id:${id}!`,
      data: {
        errors: error,
      },
    };
  }
};

const fetchStudyGroupByUuid = async (
  uuid: string
): Promise<ServiceResponse> => {
  try {
    const collection = await getStudyGroupByUuid(uuid);
    return {
      success: true,
      message: `Success fetched study group with UUID:${uuid}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching study group data with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

const addStudyGroup = async (studyGroupData: {
  starting_school_years_id: string;
  name: string;
  homeroom_teacher_id: string;
  counseling_teacher_id: string;
  year: "X" | "XI" | "XII";
  major_id: string;
  isActive: boolean;
}): Promise<ServiceResponse> => {
  try {
    const createdStudyGroup = await createStudyGroup(studyGroupData);
    return {
      success: true,
      message: "Study group added successfully!",
      data: createdStudyGroup,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding study group!",
      data: {
        errors: error,
      },
    };
  }
};

const editStudyGroup = async (
  uuid: string,
  updateData: {
    starting_school_years_id?: string;
    name?: string;
    homeroom_teacher_id?: string;
    counseling_teacher_id?: string;
    year?: "X" | "XI" | "XII";
    major_id?: string;
    isActive?: boolean;
  }
): Promise<ServiceResponse> => {
  try {
    const updatedStudyGroup = await updateStudyGroup(uuid, updateData);
    return {
      success: true,
      message: `Study group with UUID:${uuid} updated successfully!`,
      data: updatedStudyGroup,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating study group with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

const removeStudyGroup = async (
  uuid: string
): Promise<ServiceResponse> => {
  try {
    const deletedStudyGroup = await deleteStudyGroup(uuid);
    return {
      success: true,
      message: `Study group with UUID:${uuid} deleted successfully!`,
      data: deletedStudyGroup,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting study group with UUID:${uuid}!`,
      data: {
        errors: error,
      },
    };
  }
};

export default {
    fetchStudyGroups,
    fetchStudyGroupById,
    fetchStudyGroupByUuid,
    createStudyGroup,
    updateStudyGroup,
    deleteStudyGroup
}
