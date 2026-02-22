import React, { useState, useRef } from "react";
import '../CSS/upload.css'
const HomePage = () => {

    const [product, setProduct] = useState({ id: '', image: null });

    const [imageSrc, setImageSrc] = useState(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [dpi, setDpi] = useState(0);
    const [maxSizeKB, setMaxSizeKB] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    const handleChangeimg = (e) => {
        const file = e.target.files[0];
        console.log("Hello",file)
        if (!file || !file.type.startsWith("image/")) return;



        setProduct({ ...product, image: file });
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        console.log("first")
        const formData = new FormData();
        const currentTime = new Date().valueOf();
        formData.append('id', currentTime);
        formData.append('photo', product.image);
        setProduct({ ...product, id: currentTime });
        try {
            const response = await fetch('http://127.0.0.1:8000/Mizanur/photo_upload/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            console.log('Product uploaded successfully:', data);
            alert("Product uploaded successfully!");
            if (data.status === 'success') {
                const url = URL.createObjectURL(product.image);
                setImageSrc(url);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const processImage = (e) => {
        const formData = new FormData();
        formData.append('id', product.id);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('dpi', dpi);
        formData.append('max_size_kb', maxSizeKB);
        fetch('http://127.0.0.1:8000/Mizanur/resize_image/', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Image processed:', data);
                alert("Image processed successfully!");
                if (data.status === 'success') {
                    const basepath = "E:\\Projects\\Personal Project\\DocsManagement\\docsMgmntBackend\\";
                    setDownloadUrl(data.output_image.replace(basepath, 'http://127.0.0.1:8000/'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    const handleDownload = async () => {
        console.log("link", downloadUrl)
        try {
            const response = await fetch(downloadUrl);
            if (!response.ok) throw new Error("Failed to fetch image");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "resized_image.jpg";
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
        }
    };

    return (
        <div>
            <div className="resizer_container">
                <h2 className="resizer_title">Image Resizer Tool</h2>

                <form onSubmit={handleUpload} >
                    <label className="resizer_upload">
                        Choose Image
                        <input type="file" accept="image/*" onChange={handleChangeimg} hidden />

                    </label>
                    {
                        product.image && <div className="resizer_previewBox">
                            <img
                                src={URL.createObjectURL(product.image)}
                                ref={imgRef}
                                alt="preview"
                            //   onLoad={drawImage}
                            />
                        </div>
                    }
                    <button type="submit" >Upload</button>
                </form>

                {imageSrc && (
                    <>


                        <div className="resizer_controls">
                            <div>
                                <label>Width: </label>
                                <input
                                    type="number"

                                    defaultValue={width}
                                    onChange={(e) => setWidth(+e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Height: </label>
                                <input
                                    type="number"

                                    defaultValue={height}
                                    onChange={(e) => setHeight(+e.target.value)}
                                />
                            </div>
                            <div>
                                <label>DPI : </label>
                                <input
                                    type="number"

                                    defaultValue={dpi}
                                    onChange={(e) => setDpi(+e.target.value)}
                                />
                            </div>
                            <div>
                                <label>max_size_kb : </label>
                                <input
                                    type="number"


                                    defaultValue={maxSizeKB}
                                    onChange={(e) => setMaxSizeKB(+e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="resizer_downloadBtn" onClick={processImage}>
                            Process
                        </button>

                    </>
                )}

                {downloadUrl && (
                    <div onClick={handleDownload}>
                        <img src={downloadUrl} alt="Resized" />
                        <div>Download Resized Image</div>

                    </div>
                )}

                <canvas ref={canvasRef} hidden />
            </div>
        </div>
    )
}

export default HomePage