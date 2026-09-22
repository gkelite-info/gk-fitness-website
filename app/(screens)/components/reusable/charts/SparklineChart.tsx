export default function SparklineChart() {
  const points = [
    { x: 0, y: 50 },
    { x: 15, y: 55 },
    { x: 55, y: 15 },
    { x: 95, y: 75 },
    { x: 120, y: 50 },
    { x: 145, y: 65 },
    { x: 180, y: 55 },
    { x: 205, y: 65 },
    { x: 235, y: 75 },
    { x: 250, y: 45 },
    { x: 280, y: 65 },
    { x: 300, y: 55 },
    { x: 330, y: 60 },
    { x: 345, y: 55 },
    { x: 360, y: 70 },
    { x: 375, y: 60 },
    { x: 385, y: 65 },
    { x: 395, y: 65 },
    { x: 400, y: 10 },
  ];

  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');

  const fillPathD = `${pathD} L 400 100 L 0 100 Z`;

  return (
    <div className="relative w-full h-[70px] md:h-[90px] pointer-events-none mt-1">
      <svg 
        viewBox="-5 0 410 100" 
        preserveAspectRatio="none" 
        className="w-full h-full absolute inset-0"
      >
        <defs>
          <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#14161A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C1FD00" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Fill Area */}
        <path 
          d={fillPathD} 
          fill="url(#sparkline-gradient)" 
        />
        
        {/* Stroke Line */}
        <path 
          d={pathD} 
          fill="none" 
          stroke="#E7FF9B" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Data Points */}
        {points.map((p, i) => (
          <circle 
            key={i} 
            cx={p.x} 
            cy={p.y} 
            r="2" 
            fill="#C6F432" 
          />
        ))}
      </svg>
    </div>
  );
}
