import React from 'react'
import { useState } from 'react'
import '../CSS/upload.css'
const CompressPdfCrad = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [converToPdfbutton, setconvertToPdfbutton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dpi, setDpi] = useState(72);
    const [quality, setQuality] = useState(50);
    const handleImageUpload = (e) => {
        const files = e.target.files[0];

        if (!files) {
            setError("Please select a PDF file.");
            return;
        }
        setconvertToPdfbutton(true);
        const imagePreviews = {
            files,
            preview: URL.createObjectURL(files),
        };

        setImages([imagePreviews]);
        setError("");
    };
    const handleConvertToPdf = async () => {

        if (images.length === 0) {
            setError("Please upload at least one image.");
            return;
        }

        setLoading(true);

        const formData = new FormData();

        formData.append("pdf", images[0].files);

        formData.append('dpi', dpi); // Example DPI
        formData.append('jpeg_quality', quality); // Example JPEG quality
        

        try {
            const response = await fetch("https://lordcarson132.pythonanywhere.com/Mizanur/compress_pdf/", {
                method: "POST",
                body: formData
            });

            const blob = await response.blob();
            
            console.log(blob)
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "compressed.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();

        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        }

        setLoading(false);
    };
    return (
        <div>
            <div className="container_imgtopdf" id="container_imgtopdf">
                <div className="content_imgtopdf" id="content_imgtopdf">
                    <h1 className="title_imgtopdf" id="title_imgtopdf">
                        Compress PDF
                    </h1>

                    <p className="subtitle_imgtopdf" id="subtitle_imgtopdf">
                        Upload a PDF and convert it into a compressed PDF.
                    </p>

                    <div className="buttonRow_imgtopdf" id="buttonRow_imgtopdf">
                        <label
                            htmlFor="fileUpload_imgtopdf"
                            className="mainButton_imgtopdf"
                            id="mainButton_imgtopdf"
                        >
                            Select PDF
                        </label>

                        <input
                            type="file"
                            id="fileUpload_imgtopdf"
                            className="fileInput_imgtopdf"
                            multiple
                            accept="application/pdf"
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
                            <iframe
                                src={img.preview}
                                title='PDF Preview'
                                alt="preview"
                                className="previewImage_imgtopdf"
                                id={`previewImage_${index}_imgtopdf`}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <div className='metadata_1'>
                        <label
                            htmlFor="fileUpload_imgtopdf"
                           
                            id="mainButton_imgtopdf"
                        >
                             DPI
                        </label>

                        <input

                           
                            type="range"
                            min="30"
                            max="150"
                            defaultValue={dpi}
                            onChange={(e) => setDpi(e.target.value)}
                            style={{ width: "100%", marginTop: "10px" }}
                        />
                    </div>
                    <div className='metadata_1'>
                        <label
                            htmlFor="fileUpload_imgtopdf"
                            
                            id="mainButton_imgtopdf"
                            style={{ width: "100%", marginTop: "10px" }}
                        >
                             JPEG Quality
                        </label>

                        <input

                            
                            type="range"
                            min="2"
                            max="100"
                            defaultValue={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            style={{ width: "100%", marginTop: "10px" }}
                        />
                    </div>
                </div>
            </div>
            <div>
                {converToPdfbutton && <div className="convertButton_imgtopdf"
                    id="convertButton_imgtopdf" onClick={handleConvertToPdf}
                >{loading ? "Processing..." : "Compress PDF"}</div>}
            </div>
        </div>
    )
}

export default CompressPdfCrad