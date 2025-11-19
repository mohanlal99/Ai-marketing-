import React from 'react';
import { MerchProduct } from '../types';
import { Shirt, Coffee, ShoppingBag, HardHat, StickyNote, Umbrella } from 'lucide-react';

interface MerchGridProps {
  onSelect: (product: MerchProduct) => void;
  disabled: boolean;
}

const products: MerchProduct[] = [
  { id: 'tshirt', name: 'White T-Shirt', icon: 'shirt', description: 'Classic fit cotton tee' },
  { id: 'mug', name: 'Ceramic Mug', icon: 'mug', description: '11oz glossy white mug' },
  { id: 'tote', name: 'Canvas Tote Bag', icon: 'bag', description: 'Eco-friendly shopping bag' },
  { id: 'hoodie', name: 'Black Hoodie', icon: 'shirt', description: 'Premium heavy blend' },
  { id: 'cap', name: 'Baseball Cap', icon: 'hat', description: 'Embroidered style cap' },
  { id: 'notebook', name: 'Spiral Notebook', icon: 'note', description: 'Hardcover journal' },
];

export const MerchGrid: React.FC<MerchGridProps> = ({ onSelect, disabled }) => {
  
  const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'shirt': return <Shirt className="w-6 h-6" />;
        case 'mug': return <Coffee className="w-6 h-6" />;
        case 'bag': return <ShoppingBag className="w-6 h-6" />;
        case 'hat': return <HardHat className="w-6 h-6" />; // Approx for cap
        case 'note': return <StickyNote className="w-6 h-6" />;
        default: return <Umbrella className="w-6 h-6" />;
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Select Product</h3>
        <p className="text-sm text-slate-400">
          Choose a product to instantly visualize your uploaded design on real-world merchandise.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            disabled={disabled}
            className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all group text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all">
              {getIcon(product.icon)}
            </div>
            <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                {product.name}
            </span>
            <span className="text-xs text-slate-500 mt-1">
                {product.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};