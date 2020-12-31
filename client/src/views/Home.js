import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const slides = [
  {
    coverImg: require("../assets/bag-cover.webp"),
    item: {
      name: "Bags & Accessories",
      link: "/shop/accessories",

      img: require("../assets/bag.webp"),
    },
  },
  {
    coverImg: require("../assets/shirts-cover.webp"),
    item: {
      name: "Shirts",
      link: "/shop/shirts",

      img: require("../assets/shirts.webp"),
    },
  },
  {
    coverImg: require("../assets/jackets-cover.webp"),
    item: {
      name: "Coats & Jackets",
      link: "/shop/jackets",

      img: require("../assets/jackets.webp"),
    },
  },
  {
    coverImg: require("../assets/shoes-cover.jpg"),
    item: {
      name: "Shoes & Sneakers",
      link: "/shop/foot wear",

      img: require("../assets/shoes.jpg"),
    },
  },
];

// slides.reverse();

// TODO:  Add mouse wheel indicator for home page

const Home = styled.div`
  --height: 100%;
  height: var(--vh);

  &:before {
    display: block;
    background: red;
    content: "";
    height: 70px;
    background: #fff;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
  }
  .slider {
  }
  section {
    height: var(--vh);
  }
  section .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  section .content .cover,
  section .content .item {
    height: 100%;
    flex: 1;
  }
  section .content .cover {
    display: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  section .content .item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section .content .item .item__content {
    height: 350px;
    width: 300px;
    position: relative;
    top: -20px;

    transition: transform 0.5s ease-in-out;
  }

  section .content .item .content .item__details {
    position: absolute;
  }
  section .content .item .name {
    font-size: 2rem;
  }

  section .content .item img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .button-link {
    text-transform: capitalize;
    border-bottom: 2px solid #000;
    font-weight: bold;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    /* overflow: hidden; */
    section .content {
      transition: transform 0.5s ease-in-out;
      transform: scale(0.95);
    }
    section.active .content {
      transform: scale(1);
    }
    &:before {
      display: none;
    }
    .slider {
      overflow: hidden;
      /* height: 100%; */
      transition: transform 0.8s ease-in-out;
    }

    section .content .cover {
      display: block;
    }
    section .content .item .item__content {
      height: 300px;
      width: 250px;
      top: -20px;
      left: 0px;
    }

    section .content .item .item__content .item__details {
      bottom: -40px;
      left: -40px;
    }
  }
  @media (min-width: 1200px) {
    margin-top: 0px;
    --height: calc(100vh - 0px);
    overflow: hidden;

    section .content .cover {
      display: block;
    }

    section .content .item .item__content .name {
      font-size: 1.6rem;
      max-width: 250px;
    }
    section .content .item .item__content .item__details {
      bottom: -20px;
      left: -40px;
    }
    section .content .item .item__content {
      height: 350px;
      width: 300px;
      top: -20px;
    }
  }
`;

export default () => {
  const containerRef = useRef(null);
  const idx = useRef(0);

  const isAnimating = useRef(false);
  const slideElements = useRef(null);
  // let slideElements = null;

  function slide(dir) {
    let toIdx = null;
    if (dir === "next" && idx.current < slides.length - 1) {
      idx.current = idx.current + 1;
      toIdx = idx.current;
    } else if (dir === "prev" && idx.current > 0) {
      idx.current = idx.current - 1;
      toIdx = idx.current;
    }
    if (toIdx == null) {
      return;
    }
    isAnimating.current = true;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${
        toIdx * window.innerHeight
      }px)`;
    }
  }

  function handleMouseWheel(e) {
    if (e.currentTarget.innerWidth < 1024) return;
    if (!isAnimating.current && e.deltaY > 0) {
      slide("next");
    } else if (!isAnimating.current && e.deltaY < 0) {
      slide("prev");
    }
  }

  function handleResize(e) {
    containerRef.current.style.transform = `translateY(0)`;
  }

  useEffect(() => {
    slideElements.current = containerRef.current?.querySelectorAll("section");
    window.addEventListener("mousewheel", handleMouseWheel);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousewheel", handleMouseWheel);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Home>
      <div
        className="slider"
        ref={containerRef}
        onTransitionEnd={(e) => {
          isAnimating.current = false;
          slideElements.current.forEach((el, i) => {
            el.classList.remove("active");
            if (idx.current === i) {
              el.classList.add("active");
            }
          });
        }}
      >
        {slides.map((slide, i) => (
          <section
            key={slide.item.name}
            className={`${i === 0 ? "active" : ""}`}
          >
            <div className="content">
              <div className="item">
                <div className="item__content">
                  <img src={slide.item.img} alt={slide.item.name} />
                  <div className="item__details">
                    <h2 className="name">{slide.item.name}</h2>
                    <Link to={slide.item.link} className="button-link">
                      view Category
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="cover"
                style={{ backgroundImage: `url(${slide.coverImg})` }}
              ></div>
            </div>
          </section>
        ))}
      </div>
    </Home>
  );
};
