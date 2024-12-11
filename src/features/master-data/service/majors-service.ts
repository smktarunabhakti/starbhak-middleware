import type { Major } from "../../../common/interfaces/major-interface";
import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import { createMajor, deleteMajor, getAllMajors, getMajorById, getMajorByUuid, updateMajor } from "../../../common/model/major-model";

const fetchMajors = async (): Promise<ServiceResponse> => {
    try{

        const collection = await getAllMajors();
        return{
            success: true,
            message: "Success fetched majors data!",
            data: collection as Major[],
        }

    } catch(error) {
        return{
            success: false,
            message: "Failed fetched majors data!",
            data: { errors: error },
        }
    }
}

const fetchMajorsById = async (id: number): Promise<ServiceResponse> => {
    try{

        const collection = await getMajorById(id);
        
        if(!collection) {
            return {
                success: false,
                message: `Cannot find majors with id:${id}!`,
                statusCode: 404,
            }
        }

        return {
            success: true,
            message: `Success fetched majors with id:${id}!`,
            data: collection,
          };

    }catch(error) {
        return {
            success: false,
            message: `Failed while fetching majors data with id:${id}!`,
            data: { errors: error },
            statusCode: 500,
        };
    }
}

const fetchMajorsByUuid = async (uuid: string): Promise<ServiceResponse> => {
    try{

        const collection = await getMajorByUuid(uuid);

        if(!collection){
            return{
                success: false,
                message: `Cannot find majors with UUID:${uuid}!`,
                statusCode: 404,
            }
        }

        return {
            success: true,
            message: `Success fetched majors with UUID:${uuid}!`,
            data: collection,
          };

    }catch(error) {

        return {
            success: false,
            message: `Failed while fetching majors data with UUID:${uuid}!`,
            data: { errors: error },
            statusCode: 500,
        };

    }
}

const addMajors = async (
    majorsData: {
        name: string,
        majors_head_id: string
    }
): Promise<ServiceResponse> => {
    try{
        const createdMajors = await createMajor(majorsData);
        return{
            success: true,
            message: "Majors added successfully!",
            data: createdMajors,
            statusCode: 201,
        }

    }catch(error) {
        return {
            success: false,
            message: "Failed while adding Majors!",
            data: { errors: error },
            statusCode: 500,
        };
    }
}

const editMajors = async (
    uuid: string,
    updateData: {
        majors_head_id?: string | number;
        name?: string;
        isActive?: boolean;
    }
): Promise<ServiceResponse> => {
    try{

        console.info("[Service] updateData: ", updateData)

        const existingMajors = await getMajorByUuid(uuid);
        console.info("[Service] existingStudent: ", existingMajors)

        if (!existingMajors) {
            return {
              success: false,
              message: `Majors with UUID:${uuid} not found!`,
              statusCode: 404,
            };
          }

          const updatedMajors = await updateMajor(uuid,updateData);
          return{
            success: true,
            message:  `Majors with UUID:${uuid} updated successfully!`,
            data: updatedMajors,
            statusCode: 200,
          }

    }catch(error) {
        return {
            success: false,
            message: `Failed while updating Majors with UUID:${uuid}!`,
            data: { errors: error },
            statusCode: 500,
        };
    }
}

const removeMajors = async (uuid: string): Promise<ServiceResponse> => {
    try{

        const existingMajors = await getMajorByUuid(uuid);
        console.info("[Service] existingMajors: ", existingMajors);

        if (!existingMajors) {
            return {
                success: false,
                message: `Majors with UUID:${uuid} not found!`,
                statusCode: 404,
            };
        } 

        const deletedDataMajors = await deleteMajor(uuid);
        return{
            success: true,
            message: `Majors with UUID:${uuid} deleted successfully!`,
            data: deletedDataMajors,
            statusCode: 200
        }
        
    }catch(error) {
        return {
            success: false,
            message: `Failed while deleting majors with UUID:${uuid}!`,
            data: { errors: error },
            statusCode: 500,
        };
    }
}

export {
    fetchMajors,
    fetchMajorsById,
    fetchMajorsByUuid,
    addMajors,
    editMajors,
    removeMajors
}