export default function Post() {

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="bg-[#1D1D1D] text-[#F9FAFB] p-5 rounded-xl w-full max-w-md shadow-md">
                <div className="flex items-center gap-3 mb-3">
                    <img
                        src="https://i.pravatar.cc/150?img=15"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="font-semibold text-lg">Kelocoes</h3>
                        <p className="text-[#5A5A5A] text-sm">30 minutes ago</p>
                    </div>
                </div>
            </div>  
        </div>
    );
};
