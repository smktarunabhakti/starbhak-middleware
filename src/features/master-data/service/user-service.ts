import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import type { User } from "../../../common/interfaces/user-interface";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../../common/model/user-model";

const fetchUsers = async (): Promise<ServiceResponse> => {
  try {
    const collections = await getAllUsers();
    return {
      success: true,
      message: "Success fetched Users data!",
      data: collections as User[],
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching Users data!",
      data: { errors: error },
    };
  }
};

const fetchUserById = async (id: string): Promise<ServiceResponse> => {
  try {
    const collection = await getUserById(id);
    if (!collection) {
      return {
        success: false,
        message: `Cannot find User with id:${id}!`,
        statusCode: 404,
      };
    }
    return {
      success: true,
      message: `Success fetched User with id:${id}!`,
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while fetching User data with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const addUser = async (UserData: {
  email: string;
  passwordHash: string;
  name: string;
  roleId: string;
}): Promise<ServiceResponse> => {
  try {
    const createdUser = await createUser(UserData.email, UserData.passwordHash, UserData.name, UserData.roleId);
    return {
      success: true,
      message: "User added successfully!",
      data: createdUser,
      statusCode: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while adding User!",
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const editUser = async (
  id: string,
  updateData: {
    email: string;
    passwordHash: string;
    name: string;
    roleId: string;
  }
): Promise<ServiceResponse> => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return {
        success: false,
        message: `User with id:${id} not found!`,
        statusCode: 404,
      };
    }

    const updatedUser = await updateUser(id, updateData);
    return {
      success: true,
      message: `User with id:${id} updated successfully!`,
      data: updatedUser,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while updating User with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

const removeUser = async (id: string): Promise<ServiceResponse> => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return {
        success: false,
        message: `User with id:${id} not found!`,
        statusCode: 404,
      };
    }

    const deletedUser = await deleteUser(id);
    return {
      success: true,
      message: `User with id:${id} deleted successfully!`,
      data: deletedUser,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed while deleting User with id:${id}!`,
      data: { errors: error },
      statusCode: 500,
    };
  }
};

export {
  fetchUsers,
  fetchUserById,
  addUser,
  editUser,
  removeUser,
};
