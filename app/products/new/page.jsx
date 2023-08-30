"use client";
import InputComponent from "@components/FormElements/InputComponent";
import {
  addProductFormControls,
  firebaseConfig,
  firebaseStorageURL,
} from "@utils";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

function AddNewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    imageUrl: "",
    description: "",
  });

  const createFileName = (file) => {
    const timeStamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);

    return `${file.name}-${timeStamp}-${randomString}`;
  };

  async function firebaseImageUpload(file) {
    const fileName = createFileName(file);
    const storageReference = ref(storage, `productImages/${fileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((downloadUrl) => resolve(downloadUrl))
            .catch((error) => reject(error));
        }
      );
    });
  }

  async function handleImage(e) {
    const extractedImageUrl = await firebaseImageUpload(e.target.files[0]);

    if (extractedImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractedImageUrl,
      });
    }
  }
  function onChange(e) {
    e.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  async function createProduct(e) {
    e.preventDefault();
    const res = await axios.post("/api/products", formData);
    console.log(res);
  }

  console.log(formData);
  return (
    <form onSubmit={createProduct} className="flex flex-col">
      <h1 className="font-bold mb-2 text-xl">New Product</h1>
      <input
        accept="image/*"
        max="1000000"
        type="file"
        onChange={handleImage}
      />
      {addProductFormControls.map((item) => (
        <InputComponent
          key={item.id}
          label={item.label}
          type={item.type}
          id={item.id}
          onChange={(e) => onChange(e)}
          value={formData[item.id]}
          placeholder={item.placeholder}
        />
      ))}
      <label htmlFor="description">Description</label>
      <textarea
        value={formData.description}
        name="description"
        id="description"
        placeholder="description"
        onChange={onChange}
      />
      <button className="btn_primary">Save</button>
    </form>
  );
}

export default AddNewProduct;
