"use client";

import { createProduct, saveProduct } from "@controllers/products";
import {
  addProductFormControls,
  firebaseConfig,
  firebaseStorageURL,
} from "@utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputComponent from "./FormElements/InputComponent";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

function ProductForm({
  _id,
  name: currentName,
  price: currentPrice,
  type: currentType,
  imageUrl: currentImage,
  description: currentDescription,
}) {
  console.log(currentImage);
  const [formData, setFormData] = useState({
    name: currentName || "",
    price: currentPrice || "",
    type: currentType || "",
    imageUrl: currentImage || "",
    description: currentDescription || "",
  });
  const router = useRouter();

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

  async function handleSubmit(e) {
    e.preventDefault();
    let res;
    if (_id) {
      //update product
      res = await saveProduct({ ...formData, _id });
    } else {
      //create product
      res = await createProduct(formData);
    }

    if (res) {
      router.push("/products");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        name="imageUrl"
        id="imageUrl"
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

export default ProductForm;
