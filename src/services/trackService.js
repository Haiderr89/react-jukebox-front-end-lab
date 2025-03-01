const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

async function index() {
    try {
        const res = await fetch(BASE_URL)
        const tracks = await res.json();
        return tracks;
    } catch (error) {
        console.log(error);
    }
}

async function create(formData) {
    try {
        const res = await fetch(BASE_URL, {
            // We specify that this is a 'POST' request
            method: 'POST',
            // We're sending JSON data, so we attach a Content-Type header
            // and specify that the data being sent is type 'application/json'
            headers: {
                'Content-Type': 'application/json',
            },
            // The formData, converted to JSON, is sent as the body
            // This will be received on the backend as req.body
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
}

const update = async (id, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};


const deleteTrack = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to delete track: ${res.status} ${res.statusText}`);
        }

        // Check if response has content before parsing
        const text = await res.text();
        return text ? JSON.parse(text) : {}; // Return empty object if no content
    } catch (err) {
        console.log("Error in deleteTrack:", err);
    }
};





export {
    index,
    create,
    update,
    deleteTrack,
}