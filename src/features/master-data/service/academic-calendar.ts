import type { AcademicCalendar } from "../../../common/interfaces/academic-calendar-interface";
import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import {
  createAcademicCalendar,
  deleteAcademicCalendar,
  getAcademicCalendarById,
  getAcademicCalendarByUuid,
  getAllAcademicCalendar,
  updateAcademicCalendar,
} from "../../../common/model/academic-calender-model";

const fetchAcademicCalendar = async (): Promise<ServiceResponse> => {
  try {
    const collection = await getAllAcademicCalendar();
    return {
      success: true,
      message: "Success fetched academic calendar data!",
      data: collection as AcademicCalendar[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed fetched academic calendar data!",
      data: { errors: error },
    };
  }
};

const fetchAcademicCalendarById = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const collection = await getAcademicCalendarById(id);

    if (!collection) {
      return {
        success: false,
        message: `Cannot find academic calendar with id:${id}!`,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: `Success fetched academic calendar with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching majors data with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const fetchAcademicCalendarByUuid = async (
  uuid: string
): Promise<ServiceResponse> => {
  try {
    const collection = await getAcademicCalendarByUuid(uuid);

    if (!collection) {
      return {
        success: false,
        message: `Cannot find academic calendar with UUID:${uuid}!`,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: `Success fetched academic calendar with UUID:${uuid}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching academic calendar data with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addAcademicCalendar = async (createData: {
  name: string;
  start_date: string;
  end_date: string;
  location: string;
  is_holiday: boolean;
  is_celebrated_at_school: boolean;
  start_at: string;
  end_at: string;
  isActive: boolean;
}): Promise<ServiceResponse> => {
  try {
    const createdDataAcademicCalendar = createAcademicCalendar(createData);
    return {
      success: true,
      message: "Academic calendar added successfully!",
      data: createdDataAcademicCalendar,
      statusCode: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding academic calendar!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const editAcademicCalendar = async (
  uuid: string,
  updateData: {
    name: string;
    start_date: string;
    end_date: string;
    location: string;
    is_holiday: boolean;
    is_celebrated_at_school: boolean;
    start_at: string;
    end_at: string;
    isActive: boolean;
  }
): Promise<ServiceResponse> => {
  try {
    const existingAcademicCalendar = getAcademicCalendarByUuid(uuid);
    console.info(
      "[Service] existingAcademicCalendar: ",
      existingAcademicCalendar
    );

    if (!existingAcademicCalendar) {
      return {
        success: false,
        message: `Academic calendar with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const updatedDataAcademicCalendar = updateAcademicCalendar(
      uuid,
      updateData
    );
    return {
      success: true,
      message: `Academic calendar with UUID:${uuid} updated successfully!`,
      data: updatedDataAcademicCalendar,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating academic calendar with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const removeAcademicCalendar = async (
  uuid: string
): Promise<ServiceResponse> => {
  try {
    const existingAcademicCalendar = getAcademicCalendarByUuid(uuid);
    console.info(
      "[Service] existingAcademicCalendar: ",
      existingAcademicCalendar
    );

    if (!existingAcademicCalendar) {
      return {
        success: false,
        message: `Academic calendar with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const deletedDataAcademicCalendar = deleteAcademicCalendar(uuid);
    return {
      success: true,
      message: `Academic calendar with UUID:${uuid} deleted successfully!`,
      data: deletedDataAcademicCalendar,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting academic calendar with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

export {
  fetchAcademicCalendar,
  fetchAcademicCalendarById,
  fetchAcademicCalendarByUuid,
  addAcademicCalendar,
  editAcademicCalendar,
  removeAcademicCalendar,
};
