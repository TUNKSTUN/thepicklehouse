export default function DemoWatermarkCard() {
  return (
    <div
      className="
      z-50
        pointer-events-none
        fixed bottom-10 right-10
        w-64 h-40
        bg-primary/10 backdrop-blur-md
        border border-white/20
        shadow-xl
        rounded-2xl
        flex flex-col justify-center items-center
        text-center
      "
    >
      <h4 className="text-lg font-bold text-gray-500/70">Demo Version</h4>
      <p className="text-sm text-gray-500/50">For preview only</p>
    </div>
  );
}
