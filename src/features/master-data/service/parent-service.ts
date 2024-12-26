import type { Parent } from "../../../common/interfaces/parent-interface";
import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import {
  createParent,
  deleteParent,
  getAllParent,
  getParentById,
  getParentByUuid,
  updateParent,
} from "../../../common/model/parent-model";

const fetchParent = async (): Promise<ServiceResponse> => {
  try {
    const collection = await getAllParent();
    return {
      success: true,
      message: "Success fetched parents data!",
      data: collection as Parent[],
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed fetched parents data!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const fetchParentById = async (id: number): Promise<ServiceResponse> => {
  try {
    const collection = await getParentById(id);

    if (!collection) {
      return {
        success: false,
        message: `Cannot find parent with id:${id}!`,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: `Success fetched parent with id:${id}!`,
      data: collection,
      statusCode: 200,
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

const fetchParentByUuid = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const collection = await getParentByUuid(uuid);

    if (!collection) {
      return {
        success: false,
        message: `Cannot find parent with UUID:${uuid}!`,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: `Success fetched parent with UUID:${uuid}!`,
      data: collection,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching parent data with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addParent = async (createData: {
  username: string;
  email: string;
  password: string;
}): Promise<ServiceResponse> => {
  try {
    const createdDataParent = createParent(createData);
    return {
      success: true,
      message: "Parent added successfully!",
      data: createdDataParent,
      statusCode: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding parent!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const editParent = async (
  uuid: string,
  updateData: {
    username?: string;
    email?: string;
    password?: string;
  }
): Promise<ServiceResponse> => {
  try {
    const existingParent = getParentByUuid(uuid);
    console.info("[Service] existingParent: ", existingParent);

    if (!existingParent) {
      return {
        success: false,
        message: `parent with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const updatedDataParent = updateParent(uuid, updateData);
    return {
      success: true,
      message: `parent with UUID:${uuid} updated successfully!`,
      data: updatedDataParent,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating parent with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const removeParent = async (uuid: string): Promise<ServiceResponse> => {
  try {
    const existingParent = getParentByUuid(uuid);
    console.info("[Service] existingParent: ", existingParent);

    if (!existingParent) {
      return {
        success: false,
        message: `parent with UUID:${uuid} not found!`,
        statusCode: 404,
      };
    }

    const deletedDataParent = deleteParent(uuid);
    return {
      success: true,
      message: `parent with UUID:${uuid} deleted successfully!`,
      data: deletedDataParent,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting parent with UUID:${uuid}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

export {
  fetchParent,
  fetchParentById,
  fetchParentByUuid,
  addParent,
  editParent,
  removeParent
}
