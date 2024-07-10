import React, { useState, useEffect } from "react";
import { storage, auth } from "./Firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [hover, setHover] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [userId, setUserId] = useState(auth.currentUser.uid);
  
  async function handleUpload() {
    if (file === null && !userId) return;
    const fileRef = ref(storage, `files/${userId}/${file.name}`);
    try {
      setUploaded(false);
      await uploadBytes(fileRef, file);
      alert("uploaded");
      setUploaded(true);
    } catch (err) {
      console.log(err);
      setUploaded(false);
    }
  }
  async function handleDelete(fileName) {
    const fileRef = ref(storage, `files/${userId}/${fileName}`);
    try {
      setDeleted(false);
      await deleteObject(fileRef);
      alert("deleted");
      setDeleted(true);
    } catch (err) {
      console.log(err);
      setDeleted(false);
    }
  }
  useEffect(() => {
    setUserId(auth.currentUser.uid)
    async function getFiles() {
      const filesListRef = ref(storage, `files/${userId}`);
      try {
        const fileList = await listAll(filesListRef);
        const filePromises = fileList.items.map(async (element) => {
          const url = await getDownloadURL(element);
          return { fileName: element.name, url: url };
        });
        const resolvedFiles = await Promise.all(filePromises);
        setFilesList(resolvedFiles);
        // setFilesList((prev) => [
        //   ...prev.filter(
        //     (item) =>
        //       !resolvedFiles.some((file) => file.fileName === item.fileName)
        //   ),
        //   ...resolvedFiles,
        // ]);
      } catch (err) {
        console.log(err);
      }
    }
    getFiles();
  }, [uploaded, deleted]);

  return (
    <div style={{ padding: "40px 20px" }}>
      <div>
        <input
          type="file"
          style={{ width: "min-content", border: "none", outline: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          type="submit"
          style={{ width: "max-content" }}
          onClick={handleUpload}
        >
          Upload File
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          margin: "50px 25px",
        }}
      >
        {filesList &&
          filesList.map((item, index) => {
            return (
              <div
                key={item.fileName}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 25px",
                  background: "#f1f1f1",
                  borderRadius:"10px"
                }}
              >
                <Link
                  to={item.url}
                  id='link'
                >
                  {`${index + 1}. `}
                  {item.fileName}
                </Link>
                <button onClick={() => handleDelete(item.fileName)} style={{ width: "max-content", transition:'all .3s ease'}}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
