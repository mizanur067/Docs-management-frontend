import React from 'react'
import { useState } from 'react'
import '../CSS/upload.css'
const ImgResizeCard = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [converToPdfbutton, setconvertToPdfbutton] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleImageUpload = (e) => {
        const files = e.target.files[0];
        // console.log('files', e.target.files)
        // console.log(files)
        if (!files) {
            return;
        }
        setconvertToPdfbutton(true);
        const imagePreviews = {
            files,
            preview: URL.createObjectURL(files),
        };

        setImages([imagePreviews]);
        setError("");
        // console.log(images)
    };
    const handleCompress_img = async () => {

        if (images.length === 0) {
            setError("Please upload at least one image.");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("image", images[0].files);
        formData.append("width", 800); // Example width
        formData.append("height", 600); // Example height
        formData.append('dpi', 300); // Example DPI
        formData.append('max_size_kb', 500); // Example max size in KB
        // console.log("formData", formData)

        try {
            const response = await fetch("http://127.0.0.1:8000/Mizanur/resize_image/", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to resize image");
            }

            const blob = await response.blob();

            // Optional: get filename from backend
            const contentDisposition = response.headers.get("Content-Disposition");
            let filename = "resized.jpg";

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) filename = match[1];
            }

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url); // cleanup

        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <div>
            <div className="container_imgtopdf" id="container_imgtopdf">
                <div className="content_imgtopdf" id="content_imgtopdf">
                    <h1 className="title_imgtopdf" id="title_imgtopdf">
                        Resize the image
                    </h1>

                    <p className="subtitle_imgtopdf" id="subtitle_imgtopdf">
                        Upload your image here
                    </p>

                    <div className="buttonRow_imgtopdf" id="buttonRow_imgtopdf">
                        <label
                            htmlFor="fileUpload_imgtopdf"
                            className="mainButton_imgtopdf"
                            id="mainButton_imgtopdf"
                        >
                            Select Images
                        </label>

                        <input
                            type="file"
                            id="fileUpload_imgtopdf"
                            className="fileInput_imgtopdf"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>



                    {error && (
                        <p className="errorText_imgtopdf" id="errorText_imgtopdf">
                            {error}
                        </p>
                    )}
                </div>

                {/* Image Preview Section */}
                <div
                    className="previewContainer_imgtopdf"
                    id="previewContainer_imgtopdf"
                >
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="previewBox_imgtopdf"
                            id={`previewBox_${index}_imgtopdf`}
                        >
                            <img
                                src={img.preview}
                                alt="preview"
                                className="previewImage_imgtopdf"
                                id={`previewImage_${index}_imgtopdf`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {converToPdfbutton && <div className="convertButton_imgtopdf"
                    id="convertButton_imgtopdf" onClick={handleCompress_img}
                >{loading ? "Processing..." : "Resize the Images"}</div>}
            </div>
        </div>
    )
}

export default ImgResizeCard