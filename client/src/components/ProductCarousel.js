import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const ProductCarousel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .inner {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .thumbs {
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
  }
  .thumb {
    height: 80px;
    width: 80px;
    margin-right: 10px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
  }
  .thumb.active {
    background: red;
  }
  .controls {
    position: absolute;
    top: 50%;
    z-index: 4;
    transform: translateY(-50%);
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    /* opacity: 0; */
    transition: 0.2s ease-in-out;
  }
  .inner:hover .controls {
    /* --offset: 20px; */
    /* opacity: 1; */
  }
  --offset: -100px;
  .controls.prev {
    left: var(--offset);
  }
  .controls.next {
    right: var(--offset);
  }
  .controls svg {
    fill: #fff;
  }
  .shifting {
    /* transition: left 0.2s cubic-bezier(0.075, 0.82, 0.165, 1); */
    transition: left 0.2s ease-in-out;
  }
  .slider {
    height: 100%;
    display: flex;
    position: relative;
  }
  @media (min-width: 1024px) {
    --offset: 20px;
  }
`;

export default ({ children }) => {
  const slider = useRef(null);
  const itemWidth = useRef(1);
  const allowShift = useRef(true);
  const posX1 = useRef(0);
  const posX2 = useRef(0);
  const posInitial = useRef(0);
  const index = useRef(1);
  const threshold = 100;

  function shiftSlide(dir, action) {
    slider.current.classList.add("shifting");
    if (allowShift.current) {
      if (dir === 1) {
        index.current += 1;
        slider.current.style.left = `-${itemWidth.current * index.current}px`;
      } else if (dir === -1) {
        index.current -= 1;
        slider.current.style.left = `-${itemWidth.current * index.current}px`;
      }
    }
    allowShift.current = false;
  }
  function checkIndex() {
    slider.current.classList.remove("shifting");
    const Lenght = children.length;
    if (index.current === 0) {
      slider.current.style.left = `-${Lenght * itemWidth.current}px`;
      index.current = Lenght;
    } else if (index.current === Lenght + 1) {
      slider.current.style.left = `-${itemWidth.current}px`;
      index.current = 1;
    }

    allowShift.current = true;
  }
  function setIndex(i) {
    if (index.current === i) return;
    if (allowShift.current) {
      slider.current.classList.add("shifting");
      index.current = i;
      slider.current.style.left = `-${itemWidth.current * index.current}px`;
    }
    allowShift.current = false;
  }
  function initializeSlider() {
    slider.current.classList.remove("shifting");
    const { width } = slider.current.firstElementChild.getBoundingClientRect();

    itemWidth.current = width;
    slider.current.style.left = `-${itemWidth.current * index.current}px`;
  }

  function dragStart(e) {
    posX1.current = e.touches[0].clientX;
    posInitial.current = slider.current.offsetLeft;
  }

  function dragAction(e) {
    const offset = slider.current.offsetLeft;
    posX2.current = posX1.current - e.touches[0].clientX;
    posX1.current = e.touches[0].clientX;
    slider.current.style.left = `-${Math.abs(offset - posX2.current)}px`;
  }

  function dragEnd(e) {
    slider.current.classList.add("shifting");
    let posFinal = slider.current.offsetLeft;

    if (posFinal - posInitial.current < -threshold) {
      shiftSlide(1);
    } else if (posFinal - posInitial.current > threshold) {
      shiftSlide(-1);
    } else {
      slider.current.style.left = `-${Math.abs(posInitial.current)}px`;
    }
  }
  useEffect(() => {
    setTimeout(() => {
      initializeSlider();
    });
    window.addEventListener("resize", initializeSlider);
    return () => window.removeEventListener("resize", initializeSlider);
  }, []);

  return (
    <ProductCarousel>
      <div
        className="inner"
        onTouchStart={dragStart}
        onTouchMove={dragAction}
        onTouchEnd={dragEnd}
      >
        <button className="controls prev" onClick={() => shiftSlide(-1)}>
          <IoIosArrowBack size={25} />
        </button>
        <button className="controls next" onClick={() => shiftSlide(1)}>
          <IoIosArrowForward size={25} />
        </button>
        <section className="slider" ref={slider} onTransitionEnd={checkIndex}>
          <div style={{ width: "100%", flexShrink: 0 }}>
            {children[children.length - 1]}
          </div>

          {children.map((child, i) => (
            <div style={{ width: "100%", flexShrink: 0 }} key={i}>
              {child}
            </div>
          ))}
          <div style={{ width: "100%", flexShrink: 0 }}>{children[0]}</div>
        </section>
      </div>
      <div className="thumbs">
        {children.map((child, i) => (
          <div
            className={`thumb`}
            key={i}
            onClick={() => setIndex(i + 1)}
            style={{ backgroundImage: `url(${child.props.thumb})` }}
          ></div>
        ))}
      </div>
    </ProductCarousel>
  );
};
