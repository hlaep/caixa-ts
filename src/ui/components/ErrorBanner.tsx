import { useEffect, useState } from "react";

interface ErrorBannerProps {
  message: string;
  visible: boolean;
  autoHideMs?: number;
}

export default function ErrorBanner({
  message,
  visible,
  autoHideMs = 4000,
}: ErrorBannerProps) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);

    if (visible && autoHideMs > 0) {
      const timer = setTimeout(() => setShow(false), autoHideMs);
      return () => clearTimeout(timer);
    }
  }, [visible, autoHideMs]);

  return <div className={`error-banner ${show ? "show" : ""}`}>{message}</div>;
}
