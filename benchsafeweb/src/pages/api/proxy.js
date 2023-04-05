import axios from 'axios';

function objectToQueryString(obj) {
    let str = '';
    for (let key in obj) {
        if (key === 'endpoint') {
            continue; // skip this iteration of the loop
        }
        if (str !== '') {
            str += '&';
        }
        str += key + '=' + obj[key];
    }
    return str;
}

export default async function handler(req, res) {
    const { query } = req;
    const { endpoint } = query
    const parameters = objectToQueryString(query)

    const url = `http://172.20.10.6:5000/${endpoint}?${parameters}`;
    console.log("url: ", url)

    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response.status).json({ message: error.message });
    }
}