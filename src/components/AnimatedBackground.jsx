import React from "react";

export default function AnimatedBackground({ weather }) {
  const type = weather?.toLowerCase();

  return (
    <>
      {type === "clouds" && (
        <>
          <div className="cloud" style={{ top: "10%", left: "0%" }}></div>
          <div className="cloud" style={{ top: "30%", left: "50%" }}></div>
        </>
      )}
      {(type === "rain" || type === "drizzle") &&
        [...Array(50)].map((_, i) => (
          <div
            key={i}
            className="rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`,
            }}
          ></div>
        ))}
      {type === "snow" &&
        [...Array(30)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
    </>
  );
}
