import axios from 'axios'

async function post(url, data) {
    try {
        const response = await axios.post(url, data)
        console.log(response); 
        return response

    } catch (error) {
        console.log(error);
    }
}


export default { post }