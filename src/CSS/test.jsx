import React from 'react'
import '../CSS/upload.css'
const ImgToPdfCard = () => {
    return (
        <div><div className="container_imgtopdf" id="container_imgtopdf">
            <div className="content_imgtopdf" id="content_imgtopdf">
                <h1 className="title_imgtopdf" id="title_imgtopdf">
                    Split PDF file
                </h1>

                <p className="subtitle_imgtopdf" id="subtitle_imgtopdf">
                    Separate one page or a whole set for easy conversion into independent PDF files.
                </p>

                <div className="buttonRow_imgtopdf" id="buttonRow_imgtopdf">
                    <button
                        className="mainButton_imgtopdf"
                        id="mainButton_imgtopdf"
                    >
                        Select PDF file
                    </button>

                    <div className="iconColumn_imgtopdf" id="iconColumn_imgtopdf">
                        <div className="iconCircle_imgtopdf" id="icon1_imgtopdf">
                            G
                        </div>
                        <div className="iconCircle_imgtopdf" id="icon2_imgtopdf">
                            D
                        </div>
                    </div>
                </div>

                <p className="dropText_imgtopdf" id="dropText_imgtopdf">
                    or drop PDF here
                </p>
            </div>

            <div className="banner_imgtopdf" id="banner_imgtopdf">
                <div className="bannerText_imgtopdf" id="bannerText_imgtopdf">
                    <h2>Forget the fret. Secure your docs.</h2>
                    <button
                        className="bannerButton_imgtopdf"
                        id="bannerButton_imgtopdf"
                    >
                        Try now
                    </button>
                </div>

                <div
                    className="bannerBrand_imgtopdf"
                    id="bannerBrand_imgtopdf"
                >
                    Adobe Acrobat
                </div>
            </div>
        </div></div>
    )
}

export default ImgToPdfCard