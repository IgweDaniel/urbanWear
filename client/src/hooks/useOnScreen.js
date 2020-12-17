import React from "react";

function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin, threshold: 0.4 }
    );

    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [rootMargin, ref]);

  return isIntersecting;
}

export default useOnScreen;
