'use client'; // Ensure this is at the top for client-side rendering

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
export default function UploadImage() {
    const [publicid, setpublicId] = useState("");
    return (
        <>
        {publicid && <CldImage src={publicid} alt={publicid} width={300} height={200} />}
            <CldUploadWidget uploadPreset="next-image" onSuccess={({ event, info }) => {
                if (event === "success") {
                    setpublicId(info?.public_id)
                }
            }}>
                {({ open }) => {
                    return (
                        <button
                            className="bg-green-600 text-white rounded-xl p-4 hover:bg-green-400 transform transition-all duration-300 ease-in-out shadow-lg hover:scale-105 hover:shadow-xl"
                            onClick={() => open()}
                        >
                            Upload an Image
                        </button>

                    );
                }}
            </CldUploadWidget>
        </>
    );
}
