import React, { useState, useRef } from "react";
import '../CSS/front-page.css'
import { useNavigate } from "react-router-dom";
import FooterCard from "../Card/FooterCard";
const HomePage = () => {
    const tools = [
        {
            title: "Image Resize",
            desc: "Resize your images to any dimension easily.",
            icon: "🖼️",
            link: "/img-resize"
        },
        {
            title: "Image Combine",
            desc: "Combine multiple images into one image.",
            icon: "🧩",
            link: "/combine-img"
        },
        // {
        //     title: "Remove Background",
        //     desc: "Automatically remove background from images.",
        //     icon: "✂️",
        //     link: "/remove-bg"
        // },
        {
            title: "Image to PDF",
            desc: "Convert images into a PDF document.",
            icon: "📄",
            link: "/img-to-pdf"
        },
        {
            title: "Compress PDF",
            desc: "Reduce PDF file size while keeping quality.",
            icon: "🗜️",
            link: "/compress-pdf"
        },
        {
            title: "Merge PDF",
            desc: "Combine multiple PDFs into one file.",
            icon: "📚",
            link: "/merge-pdf"
        },
        {
            title: "Split PDF",
            desc: "Split a PDF into separate pages.",
            icon: "⤢",
            link: "/split-pdf"
        },
        {
            title: "Unlock PDF",
            desc: "Remove password protection from PDFs.",
            icon: "🔓",
            link: "/remove-password-pdf"
        }
    ];
    const navigate = useNavigate();

    return (
        <div className="cont-footer-adjust">
            <div className="same-class">
                <div className="tools-container">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            className="tool-card"
                            onClick={() => navigate(tool.link)}
                        >
                            <div className="tool-icon">{tool.icon}</div>

                            <h3>{tool.title}</h3>

                            <p>{tool.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="same-class">
                <FooterCard />
            </div>
        </div>
    )
}

export default HomePage