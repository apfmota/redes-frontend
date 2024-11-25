const API_ADRESS = "http://localhost:8000" // mudar quando achar um lugar pra hostear

async function getJsonResponse(file, protocol) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_ADRESS}/uploadfile/${protocol}`, {
        method: 'POST',
        body: formData
    })
    return await response.json()
}

export default getJsonResponse;