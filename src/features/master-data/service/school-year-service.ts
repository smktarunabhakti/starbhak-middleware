import type { SchoolYear } from "../../../common/interfaces/school-years-interface";
import type { ServiceResponse } from "../../../common/interfaces/service-interface";
import { createSchoolYear, deleteSchoolYear, getAllSchoolYears, getSchoolYearById, getSchoolYearByUuid, updateSchoolYear } from "../../../common/model/school-year-model";

const fetchSchoolYear = async (): Promise<ServiceResponse> => {
    try{
       
        const collections = await getAllSchoolYears();

        return {
            success: true,
            message: "Success fetched school year data!",
            data: collections as SchoolYear[],
        }
        
    }catch(error) {
        return {
            success: false,
            message: "Failed fetched school year data!",
            data: { errors: error },
        }
    }
}

const fetchSchoolYearById = async (id:number): Promise<ServiceResponse> => {
    try{

        const collections = await getSchoolYearById(id);

        if(!collections){
            return {
                success: false,
                message: `Cannot find school year with id:${id}!`,
                statusCode: 404,
            }
        } else {
            return {
                success: true,
                message: `Success fetched school year with id:${id}!`,
                data: collections,
            }
        }

    } catch(error) {
        return {
            success: false,
            message: `Failed while fetching school year data with id:${id}!`,
            data: { errors: error },
            statusCode: 500,
          };
    }
}

const fetchSchoolYearByUuid = async (uuid: string): Promise<ServiceResponse> => {
    try{

        const collection = await getSchoolYearByUuid(uuid);

        if(!collection){
            return{
                success: false,
                message: `Cannot find school year with UUID:${uuid}!`,
                statusCode: 404,
            }
        } else {
            return{
                success: true,
                message: `Success fetched school year with UUID:${uuid}!`,
                data: collection,
            }
        }

    }catch(error){
        return {
            success: false,
            message: `Failed while fetching school year data with UUID:${uuid}!`,
            data: { errors: error },
            statusCode: 500,
          };
    }
}

const addSchoolYear = async (
        start: number, 
        end: number, 
        isActive: boolean
): Promise<ServiceResponse> => {

    try{
        const createdSchoolYear = await createSchoolYear(start,end,isActive);

        return {
            success: true,
            message: "School year data added successfully!",
            data: createdSchoolYear,
            statusCode: 200,
        }

    }catch(error) {
        return {
            success: false,
            message: "Failed while adding school year!",
            data: { errors: error },
            statusCode: 500,
          };
    }

}

const editSchoolYear = async (
    uuid: string,
    updateData: {
        start?: number;
        end?: number;
        isActive?: boolean;
    }
): Promise<ServiceResponse> => {
    try{

        console.info("[Service] updateData: ", updateData)

        const existingSchoolYear = await getSchoolYearByUuid(uuid);
        console.info("[Service] existingSchoolYear: ", existingSchoolYear)

        if (!existingSchoolYear) {
            return {
                success: false,
                message: `School year with UUID:${uuid} not found!`,
                statusCode: 404,
            };
        }

        const updatedDataSchoolYear = await updateSchoolYear(uuid,updateData);
        console.info("[Service] updatedSchoolYear: ", updatedDataSchoolYear);

        return {
        success: true,
        message: `School year with UUID:${uuid} updated successfully!`,
        data: updatedDataSchoolYear,
        statusCode: 200,
        };

    }catch(error){

        return {
            success: false,
            message: `Failed while updating student with UUID:${uuid}!`,
            data: { errors: error },
            statusCode: 500,
          };

    }
}

const removeSchoolYear = async (uuid: string): Promise<ServiceResponse> => {
    try{

        const existingSchoolYear = await getSchoolYearByUuid(uuid);
        console.info("[Service] existingSchoolYear: ", existingSchoolYear);

        if (!existingSchoolYear) {
            return {
                success: false,
                message: `School year with UUID:${uuid} not found!`,
                statusCode: 404,
            };
        } 

        const deleteDataSchoolYear = await deleteSchoolYear(uuid);
        return {
            success: true,
            message: `School year with UUID:${uuid} deleted successfully!`,
            data: deleteDataSchoolYear,
            statusCode: 200,
          };

    } catch(error) {

        return {
            success: false,
            message: `Failed while deleting school year with UUID:${uuid}!`,
            data: { errors: error },
            statusCode: 500,
        };

    }
}

export {
    fetchSchoolYear,
    fetchSchoolYearById,
    fetchSchoolYearByUuid,
    addSchoolYear,
    editSchoolYear,
    updateSchoolYear,
    removeSchoolYear
}