export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="flex gap-4">
        {/* Dynamically change the background of the button when active */}
        <button>Work</button>
        <button>Short Break</button>
        <button>Long Break</button>
      </div>
      {/* Timer here */}
      <div>
        <h1 className="text-8xl font-bold">25:00</h1>
      </div>
      <div>
        <button className="bg-bg-btn py-2 px-3 rounded-md hover:bg-bg-btn-hover hover:text-clr-btn-hover transition-all">
          Start
        </button>
      </div>
    </main>
  );
}
