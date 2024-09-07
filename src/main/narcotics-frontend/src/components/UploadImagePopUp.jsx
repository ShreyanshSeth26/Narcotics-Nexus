import "../css/Popup.scss"
import {useState} from "react";
import axios from "axios";
function UploadImagePopUp(props){
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        if(file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.put(`http://localhost:8080/product/id/${props.productId}/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(response.data); // Assuming the response is a success message
                closePopup();
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Failed to upload image');
            }
        }
    };

    function closePopup() {
        props.setTrigger(false);
    }
    return (props.trigger)?(
        <div className={"popup"}>
            <div className={"popup-inner"}>
                <h2 className="text-xl font-bold mb-4">Product Image</h2>
                <input type="file" onChange={handleFileChange} className="mb-2"/>
                <button onClick={handleUpload}> Upload Image</button>
                <button onClick={closePopup}>close</button>
            </div>
        </div>
    ):"";
}

export default UploadImagePopUp;