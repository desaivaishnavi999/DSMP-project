function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] z-[9999]">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
        {/* Spinning primary ring */}
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />

        {/* Inner pulsing dot */}
        <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
