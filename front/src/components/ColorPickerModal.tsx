import { useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  onClose: () => void;
  onSelect: (color: string) => void;
};

const colors = ["bg-red-500", "bg-green-400", "bg-blue-300", "bg-yellow-400", "bg-pink-500", "bg-purple-400", "bg-indigo-500", "bg-teal-400", "bg-orange-400", "bg-gray-300", "bg-gray-500", "bg-gray-700"];

export default function ColorPickerModal({ onClose, onSelect }: Props) {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return ReactDOM.createPortal(
  <div className="fixed inset-0 flex items-center justify-center z-50 " onClick={onClose}>
    <div
      className="bg-white rounded-xl p-6 shadow-xl flex flex-wrap gap-4 max-w-[90vw] max-h-[70vh] overflow-auto"
      onClick={(e) => e.stopPropagation()}
      style={{ minWidth: 300 }}
    >
      {colors.map((c) => (
        <div
          key={c}
          className={`w-10 h-10 rounded-full cursor-pointer ${c}`}
          onClick={() => onSelect(c)}
          title={c}
        />
      ))}
      <button
        onClick={onClose}
        className="text-sm text-gray-500 hover:text-red-500 ml-auto mt-4"
      >
        Cancelar
      </button>
    </div>
  </div>,
  document.body
);

}
