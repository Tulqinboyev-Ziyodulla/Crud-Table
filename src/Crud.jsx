import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleAddItem = () => {
    if (newItemName) {
      dispatch(addItem({ id: Date.now(), name: newItemName }));
      setNewItemName("");
    }
  };

  const handleUpdateItem = (id) => {
    if (editingItemName) {
      dispatch(updateItem({ id, name: editingItemName }));
      setEditingItemId(null);
      setEditingItemName("");
    }
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      dispatch(removeItem(itemToDelete));
      setItemToDelete(null);
    }
    setShowModal(false);
  };

  const filteredItems = items.filter((item) =>
    item.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  const openEditModal = (item) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">CRUD Table</h2>
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300"
        >
          Add Item
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-200 bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-all duration-200">
              <td className="border border-gray-300 p-2 text-center">{item.id}</td>
              <td className="border border-gray-300 p-2">
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    className="p-1 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {editingItemId === item.id ? (
                  <>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => openEditModal(item)}
                      className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setItemToDelete(item.id);
                        setShowModal(true);
                      }}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            {itemToDelete ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Delete Confirmation</h3>
                <p>Are you sure you want to delete this item?</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setItemToDelete(null);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-300 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteItem}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Edit Name</h3>
                <input
                  type="text"
                  value={editingItemName}
                  onChange={(e) => setEditingItemName(e.target.value)}
                  className=" border border-gray-300 p-3 rounded-lg mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setEditingItemId(null);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-300 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateItem(editingItemId);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-300"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudTable;
