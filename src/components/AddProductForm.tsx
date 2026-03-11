// src/components/AddProductForm.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product data:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card className="shadow-xl border-2 border-green-200 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b-2 border-green-100">
          <motion.div whileHover={{ x: 5 }}>
            <CardTitle className="flex items-center space-x-3 text-green-700">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Plus className="h-6 w-6" />
              </motion.div>
              <span className="font-bold">Add New Product</span>
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <Label htmlFor="name" className="font-bold text-gray-700">
                Product Name
              </Label>
              <motion.div whileFocus={{ scale: 1.02 }} className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter product name"
                  className="border-2 border-green-200 font-bold focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <Label htmlFor="description" className="font-bold text-gray-700">
                Description
              </Label>
              <motion.div whileFocus={{ scale: 1.02 }} className="mt-2">
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  placeholder="Describe your product..."
                  className="border-2 border-green-200 font-bold focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <Label htmlFor="price" className="font-bold text-gray-700">
                  Price (₦)
                </Label>
                <motion.div whileFocus={{ scale: 1.02 }} className="mt-2">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    placeholder="0.00"
                    className="border-2 border-green-200 font-bold focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </motion.div>
              </div>
              <div>
                <Label htmlFor="quantity" className="font-bold text-gray-700">
                  Quantity
                </Label>
                <motion.div whileFocus={{ scale: 1.02 }} className="mt-2">
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    required
                    placeholder="0"
                    className="border-2 border-green-200 font-bold focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
              <Label htmlFor="image" className="font-bold text-gray-700">
                Product Image
              </Label>
              <motion.div
                className="mt-2 flex justify-center px-6 pt-5 pb-6 border-3 border-dashed border-green-300 rounded-xl bg-green-50 hover:border-green-500 hover:bg-green-100 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, borderColor: '#16a34a' }}
              >
                <div className="space-y-2 text-center">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Upload className="mx-auto h-12 w-12 text-green-600 font-bold" />
                  </motion.div>
                  <div className="flex flex-col text-sm text-gray-700 font-bold">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded font-bold text-green-600 hover:text-green-700 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-0">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-600 font-bold">PNG, JPG, GIF up to 10MB</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg text-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}