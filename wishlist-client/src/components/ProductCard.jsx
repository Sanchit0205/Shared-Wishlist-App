import { useState } from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    onEdit(editedProduct);
    setEditing(false);
  };

  return (
    <div className="bg-[#fffaf5] p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center border border-[#e8d9c4]">
      {editing ? (
        <>
          <input
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            className="mb-2 p-2 border border-[#e8d9c4] rounded w-full bg-white"
            placeholder="Product Name"
          />
          <input
            value={editedProduct.imageUrl}
            onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
            className="mb-2 p-2 border border-[#e8d9c4] rounded w-full bg-white"
            placeholder="Image URL"
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            className="mb-3 p-2 border border-[#e8d9c4] rounded w-full bg-white"
            placeholder="Price"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-[#5e9b8a] text-white px-4 py-1 rounded hover:bg-[#4d897a]"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg mb-3 border border-[#f4e3c9]"
          />
          <h3 className="font-semibold text-lg text-[#d39e61]">{product.name}</h3>
          <p className="text-gray-700 font-medium mb-1">₹{product.price}</p>
          <p className="text-sm text-[#b9a392] mb-3">👤 {product.addedBy}</p>

          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setEditing(true)}
              className="text-[#c28840] hover:underline font-semibold"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="text-red-500 hover:underline font-semibold"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;

