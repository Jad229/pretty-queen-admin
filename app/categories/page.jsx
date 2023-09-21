"use client";
import Modal from "@components/Modal";
import axios from "axios";
import { useEffect, useState } from "react";

function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  async function saveCategory(e) {
    e.preventDefault();

    //check to see if edit state has something to update
    if (editCategory) {
      const res = await axios.put("/api/categories", {
        categoryName,
        parentCategory,
        _id: editedCategory._id,
      });

      setEditedCategory(null);
    } else {
      const res = await axios.post("/api/categories", {
        categoryName,
        parentCategory,
      });
    }

    setCategoryName("");
    getCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setCategoryName(category.name);
    setParentCategory(category.parent?._id);
  }

  function showModal(category) {
    setIsOpenModal(true);
    setCategoryToDelete(category);
  }

  async function deleteCategory(category) {
    const { _id } = category;
    const res = await axios.delete("/api/categories?id=" + _id);

    setIsOpenModal(false);
    getCategories();
  }
  const getCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-xl">Categories</h1>
      <label htmlFor="categoryName">
        {editedCategory
          ? `Edit Category ${editedCategory.name}`
          : "Create new Category"}
      </label>
      <form className="flex gap-1 w-full" onSubmit={saveCategory}>
        <input
          className="mb-0"
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName((prevCategoryName) => e.target.value)
          }
        />
        <select
          name=""
          id=""
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="62">No Parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button className="btn_primary">Save</button>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <div className=" flex justify-center items-center gap-1">
                    <button
                      onClick={() => editCategory(category)}
                      className="bg-amber-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => showModal(category)}
                      className="btn_red"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => deleteCategory(categoryToDelete)}
      />
    </div>
  );
}

export default Categories;
