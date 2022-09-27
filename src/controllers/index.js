import axios from "axios";

const URL = "https://alicestech.com/siketan/"

export const POSTREQ = async (end_point, parameter) => {
    return await axios.post(URL + end_point, parameter)
    .then(response => {
        if(response.data.status == true){
            return(response.data)
        }
      })
      .catch(e => {
        return(e.response.data)
    });

}
