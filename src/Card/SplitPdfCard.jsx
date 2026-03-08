import React from 'react'
import { useState } from 'react'
import '../CSS/upload.css'
import { useEffect } from 'react'
const SplitPdfCard = () => {
    const [images, setImages] = useState([]);
        const [error, setError] = useState("");
        const [converToPdfbutton, setconvertToPdfbutton] = useState(false);
        const [loading, setLoading] = useState(false);
        const [start_page, setStartPage] = useState(1);
        const [end_page, setEndPage] = useState(1);
        
        const [totalPages, setTotalPages] = useState(1);
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
        const get_total_pages = async () => {
            const formData = new FormData();
            formData.append("pdf", images[0].files);
            try{
                const res= await fetch("https://lordcarson132.pythonanywhere.com/Mizanur/no_of_pages_in_pdf/", {
                    method: "POST",
                    body: formData
                })
                const data = await res.json();
                setTotalPages(data.total_pages);
                console.log(data)
            }catch(err){
                console.error(err);
                setError("Something went wrong while fetching total pages.");
            }
        }
            
        const handleConvertToPdf = async () => {
    
            if (images.length === 0) {
                setError("Please upload at least one image.");
                return;
            }
    
            setLoading(true);
    
            const formData = new FormData();
    
            formData.append("pdf", images[0].files);
            formData.append("start_page", start_page);
            formData.append("end_page", end_page);
    
          
            
    
            try {
                const response = await fetch("https://lordcarson132.pythonanywhere.com/Mizanur/split_pdf/", {
                    method: "POST",
                    body: formData
                });
    
                const blob = await response.blob();
                
                console.log(blob)
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "splited.pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
    
            } catch (err) {
                console.error(err);
                setError("Something went wrong.");
            }
    
            setLoading(false);
        };
        useEffect(() => {
            if (images.length > 0) {
                get_total_pages();
            }
        }, [images]);

  return (
       <div>
            <div className="container_imgtopdf" id="container_imgtopdf">
                <div className="content_imgtopdf" id="content_imgtopdf">
                    <h1 className="title_imgtopdf" id="title_imgtopdf">
                        Split PDF
                    </h1>

                    <p className="subtitle_imgtopdf" id="subtitle_imgtopdf">
                        Upload a PDF and extract pages.
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
                    <div className="metadata_1">
                        <p style={{fontSize:"22px"}}>Select Page range  from 1 to {totalPages}</p>
                        
                    </div>
                    <div className='metadata_1'>
                        <label style={{paddingRight:"10px"}}
                           
                        >
                           From 
                        </label>

                        <input

                            type="number"
                            
                            defaultValue={1}
                            onChange={(e) => setStartPage(e.target.value)}
                            style={{  marginTop: "10px",
                                fontSize: "25px",
                             }}
                        />
                    </div>
                    <div className='metadata_1'>
                        <label
                            
                            style={{ width: "100%", marginTop: "10px" ,paddingRight:"48px"}}
                        >
                             To
                        </label>

                        <input

                            
                            type="number"
                           
                            defaultValue={totalPages}
                            onChange={(e) => setEndPage(e.target.value)}
                            style={{ fontSize: "25px", marginTop: "10px", 
                                margeinLeft: "20px"
                            }}
                        />
                    </div>
                </div>
            </div>
            <div>
                {converToPdfbutton && <div className="convertButton_imgtopdf"
                    id="convertButton_imgtopdf" onClick={handleConvertToPdf}
                >{loading ? "Processing..." : "split PDF"}</div>}
            </div>
        </div>
  )
}

export default SplitPdfCard