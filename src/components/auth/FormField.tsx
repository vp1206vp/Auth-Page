import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  icon,
  placeholder,
  required
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div 
        className={`
          relative rounded-lg transition-all duration-200
          ${focused 
            ? 'ring-2 ring-indigo-500 ring-opacity-50' 
            : 'ring-1 ring-white ring-opacity-10'
          }
        `}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white text-opacity-70">
          {icon}
        </div>
        
        <motion.input
          type={inputType}
          className={`
            block w-full pl-10 ${isPassword ? 'pr-10' : 'pr-3'} py-3 
            bg-white bg-opacity-10 border-transparent rounded-lg
            focus:outline-none focus:bg-opacity-20
            text-white placeholder-white placeholder-opacity-50
            transition-all duration-200
          `}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          whileFocus={{ scale: 1.01 }}
        />
        
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white text-opacity-70 hover:text-opacity-100 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};