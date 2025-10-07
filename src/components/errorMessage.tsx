import React from "react";

interface Children {
    children: React.ReactNode;
    tipo: 'error' | 'warn' | 'success';
    color?: string;
    borderColor?: string;
    text?: string;
}

export default function ErrorMessage({ children, tipo, color, borderColor, text }: Children) {
  const getDefaultColors = () => {
    switch (tipo) {
      case 'error':
        return {
          textColor: 'text-red-500',
          borderColor: 'border-red-500'
        };
      case 'warn':
        return {
          textColor: 'text-yellow-500',
          borderColor: 'border-yellow-500'
        };
      case 'success':
        return {
          textColor: 'text-green-500',
          borderColor: 'border-green-500'
        };
      default:
        return {
          textColor: 'text-red-500',
          borderColor: 'border-red-500'
        };
    }
  };

  const defaultColors = getDefaultColors();
  const finalTextColor = color || defaultColors.textColor;
  const finalBorderColor = borderColor || defaultColors.borderColor;

  return (
    <div className={`${finalBorderColor} border ${finalTextColor} p-2 rounded-md`}>
      <p className="font-semibold">{text}</p>
      {children}
    </div>
  );
}