import React, { useEffect, useState } from 'react';

const Timer = ({ duration = 60, onTimeout, active = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!active) return;

    if (timeLeft === 0) {
      onTimeout?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, active, onTimeout]);

  return (
    <div className="text-sm text-gray-600">
      Time left: <strong>{timeLeft}s</strong>
    </div>
  );
};

export default Timer;
