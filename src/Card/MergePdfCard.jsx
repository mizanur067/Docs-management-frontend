import React from 'react'
import { useState } from 'react'
import '../CSS/upload.css'
const MergePdfCard = () => {

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [converToPdfbutton, setconvertToPdfbutton] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 10) {
      setError("You can upload maximum 10 images only.");

      return;
    }
    setconvertToPdfbutton(true);
    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...imagePreviews]);
    setError("");
  };
  const handleConvertToPdf = async () => {

    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("files", img.file);
    });

    try {
      const response = await fetch("https://lordcarson132.pythonanywhere.com/Mizanur/merge_pdfs_max_size/", {
        method: "POST",
        body: formData
      });

      const blob = await response.blob();
      console.log(blob)
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
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
            Merge PDFs
          </h1>

          <p className="subtitle_imgtopdf" id="subtitle_imgtopdf">
            Upload  PDFs and convert them into a single PDF.
          </p>

          <div className="buttonRow_imgtopdf" id="buttonRow_imgtopdf">
            <label
              htmlFor="fileUpload_imgtopdf"
              className="mainButton_imgtopdf"
              id="mainButton_imgtopdf"
            >
              Select PDFs
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

          <p className="dropText_imgtopdf" id="dropText_imgtopdf">
            You can upload up to 10 PDFs.
          </p>

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
      </div>
      <div>
        {converToPdfbutton && <div className="convertButton_imgtopdf"
          id="convertButton_imgtopdf" onClick={handleConvertToPdf}
        >{loading ? "Processing..." : "Merge PDFs"}</div>}
      </div>
    </div>
  )
}

export default MergePdfCard