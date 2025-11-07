import { FaRegTrashAlt } from "react-icons/fa";

interface DeletePostProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ open, onClose, onDelete }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-[#232323] rounded-[40px] p-6 shadow-2xl flex flex-col 
            items-center w-90 max-w-md mx-auto">
                <div className="flex flex-col items-center w-full">
                    <div className="w-12 h-12 flex items-center justify-center 
                    border-2 border-red-500 rounded-full mb-2">
                        <FaRegTrashAlt className="text-red-500 text-2xl" />
                    </div>
                    <span className="font-bold text-white text-xl mb-2">Delete Post</span>
                    <span className="text-gray-300 mb-6 text-center">
                        Are you sure you want to delete?
                    </span>
                    <div className="flex gap-5">
                        <button
                            className="w-35 h-10 bg-[#4A4A4A] text-white rounded-full transition 
                            hover:bg-[#444444] focus:outline-none cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-35 h-10 bg-[#F8575A] text-white rounded-full transition 
                            hover:bg-[#ed4144] focus:outline-none cursor-pointer"
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
