import { useEffect, useState, useRef } from "react";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size/";
import useScrollPosition from "@react-hook/window-scroll";

import body from "./body.module.scss";
const pageClassColors = ["aqua", "orange", "yellow"];

const Body = () => {
  const [page, setPage] = useState(0);
  const screenRef = useRef();
  const [width, height] = useWindowSize({ fps: 60 });
  const [widthD, heightD] = useWindowSizeD();
  //const scrollY = useScrollPosition(60 /*frames per second*/);
  const [scrollPos, setScrollPos] = useState(0);
  const [pixels, setPixels] = useState("0px");
  const [scrollHeight, setScrollHeight] = useState();

  useEffect(() => {
    document.body.classList.add("aqua");
    setScrollHeight(screenRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    const elem = screenRef.current;
    const { innerHeight } = window;

    const changeBodyBgColor = () => {
      document.body.classList.add(pageClassColors[page]);

      pageClassColors
        .filter((x) => x !== pageClassColors[page])
        .forEach((x) => {
          document.body.classList.remove(x);
        });
    };
    const moveToPage = () => {
      setPixels(innerHeight * page);
      elem.style.transform = `translate3d(0px, -${pixels}px, 0px)`;
    };
    if (width > 820) {
      moveToPage(page);
      changeBodyBgColor();
    }
    if (width < 820) {
      changeBodyBgColor();
      // window.addEventListener("scroll", handleScroll);
      // return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [page, scrollPos, width, pixels]);

  const handlePageTransition = (e) => {
    console.log(e);

    const { deltaY } = e;

    if (Math.sign(deltaY) > 0) {
      // mouse up
      setPage(page < 2 ? page + 1 : 2);
      //setPage(page > 0 ? page - 1 : 0);
    } else {
      // mouse down
      setPage(page > 0 ? page - 1 : 0);
      //setPage(page < 2 ? page + 1 : 2);
    }
  };

  const handleScroll = (e) => {
    console.log(scrollHeight);
    const { scrollY } = window;
    //const { scrollHeight } = screenRef.current;
    const sectionHeight = scrollHeight / pageClassColors.length;
    const sectionHalfHeight = sectionHeight / 2;

    setScrollPos(scrollY);

    if (scrollPos > scrollY) {
      //console.log("up", scrollY, sectionHalfHeight + sectionHeight * page);
      if (scrollY <= sectionHalfHeight + sectionHeight * (page - 1))
        setPage(page - 1);
    } else {
      //console.log("down", scrollY, sectionHalfHeight + sectionHeight * page);
      if (scrollY >= sectionHalfHeight + sectionHeight * page) {
        setPage(page + 1);
      }
    }
  };

  return (
    <>
      <main
        className={body.screen}
        // ref gives access to the DOM elment
        ref={screenRef}
        onWheel={width > 820 ? handlePageTransition : handleScroll}
      >
        <div className={body.page}>
          <div className={body["page-table"]}>
            <div className={body["page-one"]}>
              <div className={body.middle}>
                <div className={body.cover}>
                  <img
                    src="https://backstagetalks.com/img/backstagetalks_cover_issue_5.png"
                    alt="Backstage talks Issue 5"
                  />
                  <p>Issue #5</p>
                  <p>
                    <a href="/">BUY HERE</a>
                  </p>
                  <p>
                    or in
                    <a href="http://backstagetalks.com/stocklist.php">
                      &nbsp;selected stores
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={body["page-table"]}>
            <div className={body["page-two"]}>
              <div>
                <div className={body.middle}>
                  <div className={body.cover}>
                    <img
                      src="https://backstagetalks.com/img/backstagetalks_cover_issue_4.png"
                      alt="Backstage talks Issue 4"
                    />
                    <p>Issue #4</p>
                    <p>
                      <a href="/">BUY HERE</a>
                    </p>
                    <p>
                      or in
                      <a href="http://backstagetalks.com/stocklist.php">
                        selected stores
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={body["page-table"]}>
            <div className={body["page-three"]}>
              <div>
                <div className={body.middle}>
                  <div className={body.cover}>
                    <img
                      src="https://backstagetalks.com/img/backstagetalks_cover_issue_3.png"
                      alt="Backstage talks Issue 3"
                    />
                    <p>Issue #3</p>
                    <p>
                      <a href="/">BUY HERE</a>
                    </p>
                    <p>
                      or in
                      <a href="http://backstagetalks.com/stocklist.php">
                        selected stores
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </main>
      <div className={body.header}>
          <img src="https://backstagetalks.com/img/logo.png" alt="logo" />
        </div>

        <div className={body.info}>
          <p>info@backstagetalks.com</p>
        </div>

        <div className={body.footer}>
          <p className={body.description}>
            Backstage Talks is a&nbsp;magazine of&nbsp;casual, but in&nbsp;depth
            dialogues on&nbsp;design and business. Our decisions shape and
            influence this complex world—to have a&nbsp;chance to&nbsp;make the
            right ones, we need to talk.
            <br></br>
            <br></br>
            <span>
              © 2021
              <a href="/" target="_blank">
                Published by studio Milk<br></br>
              </a>
            </span>
            <a href="/" target="_blank">
              Privacy Policy
            </a>
          </p>

          <div className={body.menu}>
            <ul>
              <li>
                <a class="menulink issue5" href="#issue5">
                  Issue #5
                </a>
              </li>

              <li>
                <a class="menulink issue4" href="#issue4">
                  Issue #4
                </a>
              </li>

              <li>
                <a class="menulink issue3" href="#issue3">
                  Issue #3
                </a>
              </li>

              <li>
                <a class="menulink issue2" href="#issue2">
                  Issue #2
                </a>
              </li>

              <li>
                <a class="menulink issue1" href="#issue1">
                  Issue #1
                </a>
              </li>
            </ul>
          </div></div>
    </>
  );
};

export default Body;

