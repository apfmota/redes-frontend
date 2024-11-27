import axios from "axios"

const API_ADRESS = "http://127.0.0.1:8000" // mudar quando achar um lugar pra hostear

export const getJsonResponse = async (file, protocol) => {
    try {

        const response = await axios.post(`${API_ADRESS}/uploadfile/${protocol}`, file);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchFile = async (filePath) => {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fileBlob = await response.blob();
        return fileBlob;
    } catch (error) {
        console.error('Error fetching the file:', error);
        throw error;
    }
}