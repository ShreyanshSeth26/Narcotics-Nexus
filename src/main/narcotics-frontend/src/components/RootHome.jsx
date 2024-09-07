import {useState} from "react";


function RootHome(){
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Get the selected file
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile); // Add the file to the FormData object

        // Send the file to the backend
        try {
            const response = await fetch("http://localhost:8080/root/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const filePath = await response.text(); // Get the returned file path as text
                // Assume the backend returns something like: "uploads/123456789_myImage.jpg"
                console.log(filePath);
                const relativePath = filePath.split(": ")[1]; // Extract the file path from the response string
                console.log(relativePath);
                 // Construct the full URL
                document.getElementById('uploadedImage').src = `http://localhost:8080/${relativePath}`; // Set the image URL to state to display it
                alert("File uploaded successfully!");
            } else {
                alert("Failed to upload file");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    return(
        <div>
            <h1>Root Home</h1>
            <h2>Set default Image for all products</h2>
            <input type="file" id="photoInput" accept="image/*" onChange={handleFileChange}/>
            <p id="byteArrayOutput"></p>
            <h2>Uploaded Image:</h2>
            <img id="uploadedImage" alt="uploadedImageFirst"/>
            <button onClick={handleUpload}>Submit</button>
        </div>
    )
}

export default RootHome;