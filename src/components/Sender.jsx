// // import axios from "axios";
// // import React, { useState } from "react";
// // // import toast from "react-hot-toast";

// // function Register() {
// //   const [loading, setLoading] = useState(false);
// //   const [data, setData] = useState();
// //   console.log(data);

// //   const [file, setFile] = useState(null);

// //   const validateForm = () => {
// //     if (file) {
// //       const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
// //       if (!validImageTypes.includes(file.type)) {
// //         // toast.error("Please upload a valid image file (jpg, png, gif)");
// //         return false;
// //       }

// //       if (file.size > 2 * 1024 * 1024) {
// //         // toast.error("Uploaded file size should be less than 2MB");
// //         return false;
// //       }
// //     }

// //     return true;
// //   };

// //   async function Submit() {
// //     if (!validateForm()) {
// //       return;
// //     }

// //     setLoading(true);

// //     const formdata = new FormData();

// //     if (file) {
// //       formdata.append("file", file);
// //     }

// //     try {
// //       // const PostPrediction = "http://localhost:8000/predict";  
// //       const PostPrediction = "https://potatoes-leaf-disease-detection.onrender.com/predict";
      
      
// //       const response = await axios.post(PostPrediction, formdata);
// //       if (response.status === 200) {
// //         // toast.success("Data successfully uploaded");
// //         setData(response);
// //       } else {
// //         setLoading(false);
// //       }
// //     } catch (error) {
// //       // toast.error(error.response.statusText);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   function SubmitForm(e) {
// //     e.preventDefault();
// //     Submit();
// //   }

// //   return (
// //     <form
// //       className=""
// //       onSubmit={SubmitForm}
// //       style={{ marginBottom: "4rem" }}
// //     >
// //       <div className="">
// //         <h3 className="">Personal Details</h3>
// //         <div className="">
// //           <div className="mb-3">
// //             <label className="form-label">Upload your passport</label>
// //             <input
// //               onChange={(e) => setFile(e.target.files[0])}
// //               type="file"
// //               className="form-control"
// //               accept="image/*"
// //             />
// //           </div>

// //           <button type="submit" className="">
// //             {loading ? "loading..." : "Submit"}
// //           </button>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // }

// // export default Register;

// import axios from "axios";
// import React, { useState, useRef } from "react";

// function Register() {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState();
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null); // State to store image preview

//   // File input reference
//   const fileInputRef = useRef(null);

//   // Validate the form to check the image type and size
//   const validateForm = () => {
//     if (file) {
//       const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
//       if (!validImageTypes.includes(file.type)) {
//         alert("Please upload a valid image file (jpg, png, gif)");
//         return false;
//       }

//       if (file.size > 2 * 1024 * 1024) {
//         alert("Uploaded file size should be less than 2MB");
//         return false;
//       }
//     }
//     return true;
//   };

//   // Handle file submission to backend
//   async function Submit() {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     const formdata = new FormData();
//     if (file) {
//       formdata.append("file", file);
//     }

//     try {
//       const PostPrediction = "https://potatoes-leaf-disease-detection.onrender.com/predict";
//       const response = await axios.post(PostPrediction, formdata);
//       if (response.status === 200) {
//         setData(response.data);  // Assuming response.data contains prediction details
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error uploading file", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Handle file selection or drag-and-drop
//   const handleFileSelect = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     setImagePreview(URL.createObjectURL(selectedFile));  // Generate image preview
//   };

//   // Handle form submission
//   function SubmitForm(e) {
//     e.preventDefault();
//     Submit();
//   }

//   // Handle the click on the drag-and-drop area to trigger file input
//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{
//       backgroundImage: `url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//     }}>
//       <div className="flex items-center justify-center min-h-screen  bg-opacity-50">
//         <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
//           <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Potato Leaf Disease Detection</h2>
//           <form onSubmit={SubmitForm}>
//             <div className="mb-4">
//               <label className="block text-lg font-semibold text-gray-600">Upload Potato Leaf Image</label>
//               <div
//                 className="w-full h-40 border-dashed border-4 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
//                 onClick={handleClick} // Trigger file input when clicked
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   setFile(e.dataTransfer.files[0]);
//                   setImagePreview(URL.createObjectURL(e.dataTransfer.files[0]));  // Preview on drop
//                 }}
//                 onDragOver={(e) => e.preventDefault()}
//               >
//                 {imagePreview ? (
//                   <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                 ) : (
//                   <p className="text-gray-600">Drag & Drop Image or Click to Browse</p>
//                 )}
//                 <input
//                   ref={fileInputRef}  // Referencing the file input element
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileSelect}  // Handle file selection
//                   className="hidden"  // Hide the actual file input element
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <button
//                 type="submit"
//                 className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Submit"}
//               </button>
//             </div>
//           </form>

//           {data && (
//             <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
//               <h3 className="text-xl font-semibold text-gray-700">Prediction Result</h3>
//               <p className="mt-2 text-gray-600">
//                 <strong>Predicted Class:</strong> <strong>{data.class}</strong>
//               </p>
//               <p className="text-gray-600">
//                 <strong>Confidence Level:</strong> <strong>{ (data.Confidence*100 ).toFixed(1) }% </strong> 
//               </p>
//             </div>
//           )}
//           {console.log(data)}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import axios from "axios";
import React, { useState, useRef } from "react";

function Register() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showResult, setShowResult] = useState(false); // 

  const fileInputRef = useRef(null);

  const validateForm = () => {
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        alert("Please upload a valid image file (jpg, png, gif)");
        return false;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Uploaded file size should be less than 2MB");
        return false;
      }
    }
    return true;
  };

  async function Submit() {
    if (!validateForm()) return;
    if (!imagePreview) return

    setLoading(true);
    const formdata = new FormData();
    if (file) formdata.append("file", file);

    try {
      const PostPrediction= "https://potatoes-leaf-disease-detection.onrender.com/predict";
      
      
      // const PostPrediction= "http://localhost:8000/predict" 
      const response = await axios.post(PostPrediction, formdata);
      if (response.status === 200) {
        setData(response.data);
        setShowResult(true); // ✅ Show result section
      }
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setLoading(false);
    }
  }

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  function SubmitForm(e) {
    e.preventDefault();
    Submit();
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // ✅ Clear everything
  const handleClear = (e) => {
    e.preventDefault();
    setFile(null);
    setImagePreview(null);
    setData(null);
    setShowResult(false);
    fileInputRef.current.value = null; // reset file input
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    }}>
      <div className="flex items-center justify-center min-h-screen bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Potato Leaf Disease Detection</h2>
          <form onSubmit={SubmitForm}>
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-600">Upload Potato Leaf Image</label>
              <div
                className="w-full h-40 border-dashed border-4 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handleClick}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  setFile(droppedFile);
                  setImagePreview(URL.createObjectURL(droppedFile));
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <p className="text-gray-600">Drag & Drop Image or Click to Browse</p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mb-4">
              {!showResult ? (
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-semibold cursor-pointer rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Loading..." :   "Submit"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Clear
                </button>
              )}
            </div>
          </form>

          {showResult && data && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="text-xl font-semibold text-gray-700">Prediction Result</h3>
              <p className="mt-2 text-gray-600">
                <strong>Predicted Class:</strong> <strong>{data.class}</strong>
              </p>
              <p className="text-gray-600">
                <strong>Confidence Level:</strong> <strong>{(data.confidence * 100).toFixed(1)}%</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;



