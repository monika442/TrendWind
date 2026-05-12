"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ size: '', search: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/products', { params: filters })
 .then(res => setProducts(res.data))
 .catch(err => console.log(err));
  }, [filters]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">TrendWind Products</h1>
      <div className="mb-4 flex gap-2">
        <input placeholder="Search..." className="border p-2"
          onChange={e => setFilters({...filters, search: e.target.value})} />
        <select className="border p-2" onChange={e => setFilters({...filters, size: e.target.value})}>
          <option value="">All Sizes</option>
          <option>XS</option><option>S</option><option>M</option><option>L</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(p => (
          <Link href={`/product/${p.sku}`} key={p.sku} className="border p-2 hover:shadow">
            <img src={p.images?.[0] || 'https://via.placeholder.com/300'} alt={p.name} className="w-full h-48 object-cover" />
            <h3 className="font-bold">{p.name}</h3>
            <div className="flex gap-2 items-center">
              <p>N${p.sale_price || p.price}</p>
              {p.sale_price && <span className="bg-red-500 text-white px-2 text-xs">SALE</span>}
            </div>
            {p.stock < 5 && p.stock > 0 && <p className="text-orange-500 text-sm">Only {p.stock} left!</p>}
            {p.stock === 0 && <p className="text-red-500 text-sm">Out of Stock</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
