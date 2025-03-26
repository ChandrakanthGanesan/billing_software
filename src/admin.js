import React, { useState, useContext } from 'react';
import { ItemContext } from './ItemContext';

const Admin = () => {
    const { items, setItems } = useContext(ItemContext);
    const [newItem, setNewItem] = useState({ item: '', cost: '', gst: '' });

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItem.item && newItem.cost && newItem.gst) {
            setItems([...items, newItem]); // Update global state
            setNewItem({ item: '', cost: '', gst: '' });
        }
    };

    const handleRemove = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-4">
            <h2>Admin Panel - Add Items</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input type="text" className="form-control" name="item" value={newItem.item} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cost</label>
                    <input type="number" className="form-control" name="cost" value={newItem.cost} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">GST (%)</label>
                    <input type="number" className="form-control" name="gst" value={newItem.gst} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Item</button>
            </form>

            <h3>Item List</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Cost</th>
                        <th>GST (%)</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.item}</td>
                            <td>₹{item.cost}</td>
                            <td>{item.gst}%</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
