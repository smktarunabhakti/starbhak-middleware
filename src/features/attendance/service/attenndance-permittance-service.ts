import type { AttenndancePermittance, statusEnum, typeEnum } from "../../../common/interfaces/attenndance-permittance-interface";
import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import { createAttenndancePermittance, deleteAttenndancePermittance, getAllAttenndancePermittances, getAttenndancePermittanceById, updateAttenndancePermittance } from "../../../common/model/attenndance-permittance-model";

const fetchAttendancePermitance = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllAttenndancePermittances();
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
    const collection = await getAttenndancePermittanceById(id);
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
    student_id: string
    description: string
    date: string | Date
    type: typeEnum
    status: statusEnum
    teacher_id: string
    isActive: boolean
}): Promise<ServiceResponse> => {
  try {
    const createdAttendancePermittance = await createAttenndancePermittance(
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
    const existingAttendancePermittance = await getAttenndancePermittanceById(
      id
    );
    if (!existingAttendancePermittance) {
      return {
        success: false,
        message: `AttendancePermittance with id:${id} not found!`,
        statusCode: 404,
      };
    }

    const updatedAttendancePermittance = await updateAttenndancePermittance(
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
    const existingAttendancePermittance = await getAttenndancePermittanceById(
      id
    );
    if (!existingAttendancePermittance) {
      return {
        success: false,
        message: `AttendancePermittance with id:${id} not found!`,
        statusCode: 404,
      };
    }

    const deletedAttendancePermittance = await deleteAttenndancePermittance(
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
    removeAttendancePermittance
}
