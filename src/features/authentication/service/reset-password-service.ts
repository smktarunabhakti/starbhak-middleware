import {getById} from '../model/user-model.ts';

export const resetPassword = (id:number,name: string,password: string) => {
    let updateUser = getById(id);
    console.log(`update data: ${updateUser}`);

    if(updateUser?.name && updateUser?.password ) {
       console.log("Update failed");
       return{
        success: false,
        message: "Tidak ada yang di update",
       }
    }

    console.log('Update Success')
    return {
        success: true,
        message: {
            id: id,
            name: name,
            password: password,
        },
    }
}