import type { AttenndancePermittance, statusEnum, typeEnum } from "../../../common/interfaces/attenndance-permittance-interface";
import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import { createAttendancePermittance, deleteAttendancePermittance, getAllAttendancePermittances, getAttendancePermittanceById, updateAttendancePermittance } from "../../../common/model/attendance-permittance-model";

const fetchAttendancePermitance = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllAttendancePermittances();
    return {
      success: true,
      message: "Success fetched attendance permittance data!",
      data: collections as AttenndancePermittance[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching attendance permittance data!",
      data: { errors: error },
    };
  }
};

const fetchAttendancePermittanceById = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const collection = await getAttendancePermittanceById(id);
    if (!collection) {
      return {
        success: false,
        message: `Cannot find AttendancePermittance with id:${id}!`,
        statusCode: 404,
      };
    }
    return {
      success: true,
      message: `Success fetched AttendancePermittance with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching AttendancePermittance data with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addAttendancePermittance = async (AttendancePermittanceData: {
    student_id?: string
    description?: string
    date: string | Date
    type: typeEnum
    status: statusEnum
    teacher_id?: string
}): Promise<ServiceResponse> => {
  try {
    const createdAttendancePermittance = await createAttendancePermittance(
      AttendancePermittanceData
    );
    return {
      success: true,
      message: "AttendancePermittance added successfully!",
      data: createdAttendancePermittance,
      statusCode: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding AttendancePermittance!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addAttendancePermittanceFromToDateSameExcuses = async (
  AttendancePermittanceData: {
  excuses?: string
  type: typeEnum
  teacher_id?: string
  student_id?: string
}, startDate: Date, endDate: Date): Promise<ServiceResponse> => {
try {

  let createdAttendancePermittance = [];

  for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

    let data = await createAttendancePermittance({
      date: currentDate,
      description: AttendancePermittanceData.excuses,
      status: "ACCEPTED",
      type: AttendancePermittanceData.type,
      teacher_id: AttendancePermittanceData.teacher_id,
      student_id: AttendancePermittanceData.student_id
    });

    createdAttendancePermittance.push(data);
  }

  return {
    success: true,
    message: "AttendancePermittance added successfully!",
    data: createdAttendancePermittance,
    statusCode: 201,
  };
} catch (error) {
  return {
    success: false,
    message: "Failed while adding AttendancePermittance!",
    data: { errors: error },
    statusCode: 500,
  };
}
};

const editAttendancePermittance = async (
  id: number,
  updateData: {
    student_id: string
    description: string
    date: string | Date
    type: typeEnum
    status: statusEnum 
    teacher_id: string
    isActive: boolean
  }
): Promise<ServiceResponse> => {
  try {
    const existingAttendancePermittance = await getAttendancePermittanceById(
      id
    );
    if (!existingAttendancePermittance) {
      return {
        success: false,
        message: `AttendancePermittance with id:${id} not found!`,
        statusCode: 404,
      };
    }

    const updatedAttendancePermittance = await updateAttendancePermittance(
      id,
      updateData
    );
    return {
      success: true,
      message: `AttendancePermittance with id:${id} updated successfully!`,
      data: updatedAttendancePermittance,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating AttendancePermittance with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const removeAttendancePermittance = async (
  id: number
): Promise<ServiceResponse> => {
  try {
    const existingAttendancePermittance = await getAttendancePermittanceById(
      id
    );
    if (!existingAttendancePermittance) {
      return {
        success: false,
        message: `AttendancePermittance with id:${id} not found!`,
        statusCode: 404,
      };
    }

    const deletedAttendancePermittance = await deleteAttendancePermittance(
      id
    );
    return {
      success: true,
      message: `AttendancePermittance with id:${id} deleted successfully!`,
      data: deletedAttendancePermittance,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting AttendancePermittance with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

export {
    fetchAttendancePermitance,
    fetchAttendancePermittanceById,
    addAttendancePermittance,
    editAttendancePermittance,
    removeAttendancePermittance,
    addAttendancePermittanceFromToDateSameExcuses
}
