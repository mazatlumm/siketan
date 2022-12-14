import axios from "axios";

const URL = "https://siketan.com/"

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

export const GETREQ = async (end_point, parameter) => {
    return await axios.get(URL + end_point, {
        params:parameter
    })
    .then(response => {
        if(response.data.status == true){
            return(response.data)
        }
    })
    .catch(e => {
        return(e.response.data)
    });
}
