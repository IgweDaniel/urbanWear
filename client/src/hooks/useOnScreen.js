import React from "react";

function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    if ("IntersectionObserver" in window) {
      const element = ref.current;
      const observer = new window.IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { rootMargin, threshold: 0.4 }
      );
      if (element) {
        observer.observe(element);
      }
      return () => {
        if (element) observer.unobserve(element);
      };
    }
  }, [rootMargin, ref]);

  return isIntersecting;
}

export default useOnScreen;
