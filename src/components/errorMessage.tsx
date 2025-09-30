import React from "react";

interface Children {
    children: React.ReactNode;
    tipo: 'error' | 'warn' | 'success';
    color?: string;
    borderColor?: string;
    text: string;
}

export default function ErrorMessage({ children }: Children) {
  return (
    <div className="${borderColor ? borderColor : 'border-red-500'} border ${color ? color : 'text-red-500'} p-2">
      {children}
    </div>
  );
}