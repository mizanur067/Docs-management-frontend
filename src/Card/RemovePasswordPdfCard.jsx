import React from 'react'
import { useState } from 'react'
import '../CSS/upload.css'
const RemovePasswordPdfCard = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [converToPdfbutton, setconvertToPdfbutton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
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
            formData.append("password", password);
            
    
          
            
    
            try {
                const response = await fetch("http://127.0.0.1:8000/Mizanur/remove_pdf_password/", {
                    method: "POST",
                    body: formData
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    alert(errorText);
                    return;
                }
                const blob = await response.blob();
                
                console.log(blob)
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "unlocked.pdf";
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
                        Unlock  PDF
                    </h1>

                    <p className="subtitle_imgtopdf" id="subtitle_imgtopdf">
                        Upload a password protected PDF and unlock it.
                    </p>

                    <div className="buttonRow_imgtopdf" id="buttonRow_imgtopdf">
                        <label
                            htmlFor="fileUpload_imgtopdf"
                            className="mainButton_imgtopdf"
                            id="mainButton_imgtopdf"
                        >
                            Upload PDF
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
                        <label style={{paddingRight:"10px"}}
                           
                        >
                           Enter the password 
                        </label>

                        <input

                            type="password"
                            
                            onChange={(e) => setPassword(e.target.value)}
                            
                            style={{  marginTop: "10px",
                                fontSize: "25px",
                             }}
                        />
                    </div>
                    
                </div>
            </div>
            <div>
                {converToPdfbutton && <div className="convertButton_imgtopdf"
                    id="convertButton_imgtopdf" onClick={handleConvertToPdf}
                >{loading ? "Processing..." : "Unlock PDF"}</div>}
            </div>
        </div>
  )
}

export default RemovePasswordPdfCard