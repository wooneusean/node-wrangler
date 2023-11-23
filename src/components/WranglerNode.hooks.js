import { useEffect, useRef, useState } from 'react';

/**
 *
 * @param {HTMLElement} handle Element to act as the {@link WranglerNode} handle
 * @returns
 */
export const useNodeControls = (handle) => {
  const isDragging = useRef(false);

  /** @type {[{x: number, y: number}, React.Dispatch<React.SetStateAction<{x: number, y: number}>>]} */
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ offsetX: 0, offsetY: 0 });

  useEffect(() => {
    if (handle != null) {
      const mouseDownListener = (e) => {
        isDragging.current = true;

        const boundingRect = handle.getBoundingClientRect();

        offsetRef.current = {
          offsetX: e.clientX - boundingRect.left,
          offsetY: e.clientY - boundingRect.top,
        };
      };
      handle.addEventListener('mousedown', mouseDownListener);

      const mouseUpListener = () => {
        isDragging.current = false;
      };
      window.addEventListener('mouseup', mouseUpListener);

      const mouseMoveListener = (e) => {
        if (isDragging.current) {
          setPosition({
            x: e.clientX - offsetRef.current.offsetX,
            y: e.clientY - offsetRef.current.offsetY,
          });
        }
      };
      window.addEventListener('mousemove', mouseMoveListener);

      return () => {
        handle.removeEventListener('mousedown', mouseDownListener);
        window.removeEventListener('mouseup', mouseUpListener);
        window.removeEventListener('mousemove', mouseMoveListener);
      };
    }
  }, [handle]);

  return [position, isDragging];
};
