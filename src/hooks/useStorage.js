import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timeStamp,
} from "../firebase/config";

const useStorage = (file, user) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  // console.log(user)

  useEffect(() => {
    //references : if images is uploaded in default storage, file.name should be used as a name
    const storageRef = projectStorage.ref(file.name);
    //collection is a container of documents
    //document is a unit of storage. It includes key-value objects
    const collectionRef = projectFirestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timeStamp();

        collectionRef.add({ user: user.displayName, url, createdAt });
        setUrl(url);
      }
    );
  }, [file, user]);
  //useEffect callback will be fired if file dependency is changed
  return { progress, url, error };
};

export default useStorage;
