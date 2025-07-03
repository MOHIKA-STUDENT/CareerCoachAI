// client/src/components/ui/card.jsx
export function Card({ children, className = "" }) {
    return <div className={`rounded-xl border p-4 bg-white text-black ${className}`}>{children}</div>;
  }
  
  export function CardHeader({ children }) {
    return <div className="mb-2">{children}</div>;
  }
  
  export function CardTitle({ children, className = "" }) {
    return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
  }
  
  export function CardContent({ children }) {
    return <div>{children}</div>;
  }
  
  export function CardDescription({ children, className = "" }) {
    return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
  }
  