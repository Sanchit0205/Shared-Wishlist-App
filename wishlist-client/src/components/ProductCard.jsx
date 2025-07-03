import { useState } from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    onEdit(editedProduct);
    setEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col items-center transition hover:shadow-lg">
      {editing ? (
        <>
          <input
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            value={editedProduct.imageUrl}
            onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
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
            className="w-32 h-32 object-cover rounded mb-2"
          />
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
          <p className="text-sm text-gray-400 mt-1">Added by: {product.addedBy}</p>

          <div className="flex gap-3 mt-3 text-sm">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-500 hover:underline"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
