import React, { useState } from 'react';
import './CreateProductForm.scss';

const CreateProductForm = () => {
  const [productName, setProductName] = useState('');
  const [unitCost, setUnitCost] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('prod_name', productName);
    formData.append('unit_cost', unitCost);

    try {
      const response = await fetch('http://35.200.144.96:8859/dixtest/product/save', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setProductName('');
        setUnitCost('');
      } else {
        const errorData = await response.json();
        console.error('Response Error:', errorData);
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div className="create-product-form">
      <h2>Create Product</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Unit Cost:
          <input
            type="number"
            value={unitCost}
            onChange={(e) => setUnitCost(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductForm;
