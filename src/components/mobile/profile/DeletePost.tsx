// PopupModal.tsx
import React from 'react';

interface DeletePostProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ open, onClose, onDelete }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#232323] rounded-2xl p-6 shadow-2xl flex flex-col 
      items-center w-11/12 max-w-md mx-auto">
                <div className="flex flex-col items-center w-full">
                    <span className="text-red-500 text-3xl mb-2">
                        <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                            <rect x="6" y="6" width="12" height="12" rx="3"
                                stroke="currentColor" strokeWidth="2" />
                            <path d="M10 10v4M14 10v4" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </span>
                    <span className="font-bold text-white text-xl mb-2">Delete post</span>
                    <span className="text-gray-300 mb-6 text-center">
                        Are you sure you want to delete?
                    </span>
                    <div className="flex w-full gap-2">
                        <button
                            className="flex-1 bg-[#4A4A4A] text-white py-2 
                        rounded-xl transition hover:bg-[#5A5A5A] focus:outline-none
                        cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 bg-red-500 text-white 
                        py-2 rounded-xl transition hover:bg-red-600 focus:outline-none
                        cursor-pointer"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;
