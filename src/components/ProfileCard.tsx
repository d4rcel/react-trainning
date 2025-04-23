export default function ProfileCard() {
    return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="avatar"
          className="w-24 h-24 mx-auto rounded-full"
        />
        <h2 className="text-xl font-semibold mt-4">Dara Dev</h2>
        <p className="text-gray-500">Frontend Engineer at Tempo</p>
        <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Follow
        </button>
      </div>
    );
  }
  