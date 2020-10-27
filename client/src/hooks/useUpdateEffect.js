import React from "react";

function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = React.useRef(true);
  // eslint-disable-next-line
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
    // eslint-disable-next-line
  }, dependencies);
}

export default useUpdateEffect;
