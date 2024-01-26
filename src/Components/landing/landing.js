import "./landing.css";
import Typewriter from "typewriter-effect";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import React from "react";
import { motion } from "framer-motion";
import Slider from "../about/slider";
import SliderMobile from "../about/sliderMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";

import Parallax from "../intro/Components/Parallax";

const sliderArray1 = [
  {
    id: 0,
    heading: "Singing",
    img: "./8_singing_.png",
    data: "Get ready for an unforgettable musical experience that you won't want to miss! Sparsh is proud to present an electrifying event that will leave you breathless with excitement. Our talented singers are ready to take the stage and deliver an unforgettable performance that will have you tapping your feet and swaying to the beat.",
  },
  {
    id: 1,
    heading: "Dancing",
    img: "./10_dancing.png",
    data: "There are occasions when we find ourselves at a loss for words, unable to articulate the intensity of a particular moment. However, fear not, for we can turn to the art of dance as a means of conveying our emotions with precision and finesse. Today, let us employ the language of movement to express the exuberance, vitality, and merriment of youth.",
  },
  {
    id: 2,
    heading: "EDM",
    img: "./edm.jpeg",
    data: "EDM night will leave you riveted, unable to take your gaze off the spectacular exhibition in front of you. Every sense will be stimulated as the music and neon lighting conspire to produce an incredible experience that will be cherished long after the night is done.",
  },
  {
    id: 3,
    heading: "Celebrity night",
    img: "./5_shirley.png",
    data: "Celebrity night is filled with glitz and glamour, as celebrities showcase their style and talent. Guests enjoy a night of socializing, networking and entertainment while photographers capture memorable moments for the media. Celebrity nights often attract a lot of attention from fans and the media, making them a significant opportunity for celebrities to showcase their brand and influence.",
  },
];

export default function Landing(data) {
  const [sliderIndex1, setsliderIndex1] = React.useState(0);
  const [items, setitems] = React.useState([]);

  console.log(data, "date");
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <></>;
    } else {
      // Render a countdown
      return (
        <ul id="countdown">
          <li id="days">
            <div class="number">{days}</div>
            <div class="label">Days</div>
          </li>
          <li id="hours">
            <div class="number">{hours}</div>
            <div class="label">Hours</div>
          </li>
          <li id="minutes">
            <div class="number">{minutes}</div>
            <div class="label">Minutes</div>
          </li>
          <li id="seconds">
            <div class="number">{seconds}</div>
            <div class="label">Seconds</div>
          </li>
        </ul>
      );
    }
  };
  const mainRef = React.useRef(null);

  React.useEffect(() => {
    fetch(
      "https://sparsh-auth-production-5f74.up.railway.app/api/news-api/get-news"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // setIsLoaded(true);
          var flags = [],
            output = [],
            l = result?.data?.length,
            i;
          for (i = 0; i < l; i++) {
            if (flags[result?.data[i]?.title]) continue;
            flags[result?.data[i]?.title] = true;
            output.push(result?.data[i]);
          }
          console.log(output, "output");
          result = output;
          setitems(result);
          console.log(result.data[0]);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setIsLoaded(true);
          // setError(error);
          console.log(error, "error")
        }
      );
  }, []);

  console.log(items, "items");
  let text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry";

  React.useEffect(() => {
    setTimeout(() => {
      data.data.setloading(false);
    }, 5000);
  }, []);

  const matches = useMediaQuery("(max-width: 1100px)");
  return (
    <>
      {data.data.loading && (
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
            position: "fixed",
            width: "100%",
            zIndex: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DotLoader color="white" />
        </div>
      )}
      {data.data.startOnce == false && (
        <>
          <div
            style={{
              position: "absolute",
              top: "88vh",
              left: "50vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              // backgroundColor: "red",
              color: "white",
              zIndex: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-chevron-double-down svg"
              // viewBox="0 0 20 20"
              onClick={() => {
                window.scrollTo({
                  top: mainRef.current.offsetTop,
                  left: 0,
                  behavior: "smooth",
                  transition: "2s",
                });
              }}
            >
              <path
                fill-rule="evenodd"
                d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
              <path
                fill-rule="evenodd"
                d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <Parallax startOnce={data.data.startOnce} />
          <div ref={mainRef} id="main-landing">
            <div className="news-container">
              {items
                ?.filter((items, index) => {
                  if (items.title == "Paint Ball 2K23" || items.title == "Sparsh T-Shirt 2nd Slot") {
                    return items;
                  }
                })
                ?.map((items, ind) => (
                  <motion.a
                    // onClick={() => {
                    //   if(ind == 0){
                    //     data.data.setactiveUrl("/events")
                    //   }
                    //   }}
                    initial="hidden"
                    variants={{
                      hidden: {
                        default: "easeIn",
                        opacity: 0,
                      },
                      visible: {
                        default: "easeIn",
                        opacity: 1,
                      },
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    href = {items?.title == "Paint Ball 2K23" ? "https://forms.gle/74MoZnTYpxHod2tx5" : "https://www.instagram.com/reel/CqNqzHXppp_/?igshid=YmMyMTA2M2Y="}
                    whileInView="visible"
                    className="news-container-chlid"
                  >
                    
                    <span className="news-container-title">{items?.title}</span>
                    <span className="news-container-content">
                      {items?.content?.length > 80 ? items?.content?.substring(0, 80) + "..." : items?.content}
                    </span>
                  </motion.a>
                ))}
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: 0,
                opacity: 0.3,
                height: "100vh",
                width: "100%",
                objectFit: "cover",
              }}
            >
              <img
                src="./home_sparsh.jpg"
                style={{
                  objectFit: "cover",
                }}
                height="100%"
                width="100%"
              ></img>
            </div>
            <div className="right-landing-container">
              <div className="right-landing-typewriter">
                <div className="right-landing-typewriter-class">
                  <Typewriter
                    options={{
                      autoStart: true,
                      loop: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(
                          "Welcome to Gujarat's Biggest Cultural Fest"
                        )
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("You can Register here for Event!")
                        .pauseFor(2500)
                        .start();
                    }}
                  />
                </div>

                <div>
                  <Link
                    className="right-landing-register"
                    style={{
                      textDecoration: "none",
                    }}
                    onClick={() => {
                      data.data.setactiveUrl("/events");
                    }}
                    to="/events"
                  >
                    <button class="custom-btn btn-3">
                      <span>Register for Event</span>
                    </button>
                  </Link>
                  {/* <div
                style={{
                  height: "30px",
                  width: "40px",
                  // backgroundColor: "red",
                  // transform: "translateX(15px)",
                  borderLeft: "2px solid #fbcfe8",
                  borderBottom: "2px solid #fbcfe8",
                  borderTop: "2px solid #fbcfe8",
                }}
              ></div>
              <div
                style={{
                  height: "30px",
                  width: "40px",
                  borderBottom: "2px solid #fbcfe8",
                  // backgroundColor: "#fbcfe8",
                  transform: "skewX(45deg)",
                  borderTop: "2px solid #fbcfe8",
                  // borderBottom: "2px solid #fbcfe8"
                }}
              ></div>
              <div
                style={{
                  height: "30px",
                  width: "40px",
                  // backgroundColor: "#fbcfe8",
                  borderTop: "2px solid #fbcfe8",
                  // borderBottom: "2px solid #fbcfe8",
                  transform: "skewX(45deg)",
                  marginLeft: "10px"
                }}
              ></div>
              <div
                style={{
                  height: "30px",
                  width: "40px",
                  // backgroundColor: "#fbcfe8",
                  // transform: "translateX(-15px)",
                  position: "absolute",
                  insetInlineEnd: 0,
                  borderRight: "2px solid #fbcfe8",
                  borderBottom: "2px solid #fbcfe8",
                  borderTop: "2px solid #fbcfe8",
                  
                }}
              ></div> */}
                </div>
              </div>
              <Countdown
                date={1677612696727 + 1000 * 60 * 60 * 24 * 36}
                renderer={renderer}
              />
            </div>
          </div>
          <div id="main-landing-2">
            <motion.div
              initial="hidden"
              variants={{
                hidden: {
                  default: "easeIn",
                  opacity: 0,
                  x: -50,
                },
                visible: {
                  default: "easeIn",
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 2,
              }}
              whileInView="visible"
              className="landing-2-left"
            >
              <img src="./shirley.png" className="landing-2-left-img"></img>
            </motion.div>
            <motion.div
              initial="hidden"
              variants={{
                hidden: {
                  default: "easeIn",
                  opacity: 0,
                  x: -50,
                },
                visible: {
                  default: "easeIn",
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 2,
              }}
              whileInView="visible"
              className="landing-2-right"
            >
              <span className="landing-2-heading">Heart of Sparsh 2K22</span>
              <span className="landing-2-content">
                Shirley Setia, an artist of Indian heritage, is a versatile
                performer, excelling in her roles as a singer, actress, and
                social media influencer. Based in New Zealand, she has made a
                name for herself as a renowned musician, captivating audiences
                around the world with her soulful and melodious voice.Shirley
                Setia's impressive career has led her to showcase her talents on
                various platforms, including the prestigious annual cultural
                fest of Gujarat, Sparsh, where she graced the stage as a
                performer in 2022.
              </span>
              <span className="landing-2-line"></span>
              <span className="landing-2-button">Shirley Setia</span>
            </motion.div>
          </div>
          <div id="main-landing-3">
            <motion.div
              initial="hidden"
              variants={{
                hidden: {
                  default: "easeIn",
                  opacity: 0,
                  scale: 0.5,
                  zIndex: 2,
                },
                visible: {
                  default: "easeIn",
                  opacity: 1,
                  scale: 1,
                  zIndex: 2,
                },
              }}
              transition={{
                duration: 1,
              }}
              whileInView="visible"
              className="landing-3-left"
            >
              <span className="landing-3-heading">Remembering the Legend</span>
              <span className="landing-3-content">
                Krishna Kumar Kunnath, better known by his stage name KK, had
                established himself as a premier Indian backup vocalist known
                for his vast repertoire. In 2016, during Gujarat's prestigious
                annual cultural fest, Sparsh, he visited SVNIT and set the stage
                on fire and enthralled the crowd with his mellifluous tunes.
              </span>
              <span className="landing-3-line"></span>
              <span className="landing-3-button">KK</span>
            </motion.div>
            <motion.div
              initial="hidden"
              variants={{
                hidden: {
                  default: "easeIn",
                  opacity: 0,
                  scale: 0.5,
                  zIndex: 0,
                },
                visible: {
                  default: "easeIn",
                  opacity: 1,
                  scale: 1,
                  zIndex: 1,
                },
              }}
              transition={{
                duration: 1,
              }}
              whileInView="visible"
              className="landing-3-right"
            >
              <img src="./kk.png" className="landing-3-left-img"></img>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            variants={{
              hidden: {
                default: "easeIn",
                opacity: 0,
              },
              visible: {
                default: "easeIn",
                opacity: 1,
              },
            }}
            transition={{
              duration: 1,
            }}
            whileInView="visible"
            id="main-landing-4"
          >
            <div className="landing-4-slider">
              {sliderArray1
                .filter((sA) => {
                  if (sA.id == sliderIndex1) {
                    return sA;
                  }
                })
                .map((sA) => (
                  <motion.div
                    key={sA.id}
                    initial="hidden"
                    animate={{
                      opacity: [0, 1],
                      // y: [-20, 0],
                    }}
                    transition={{
                      duration: "1",
                      // times: [0, 1],
                    }}
                    className="landing-4-slider-items"
                  >
                    <div className="landing-4-slider-heading">{sA.heading}</div>
                    {/* <div className="landing-4-slider-img">
                  {sA.img}
                </div> */}
                    <div className="landing-4-slider-content">{sA.data}</div>
                    <img
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        zIndex: 0,
                        opacity: 0.4,
                        objectFit: "cover",
                      }}
                      src={sA.img}
                    ></img>
                  </motion.div>
                ))}

              <PlayArrowOutlinedIcon
                onClick={() => {
                  if (sliderIndex1 == 3) {
                    return;
                  }
                  setsliderIndex1(sliderIndex1 + 1);
                }}
                className="right-slider-button"
              />
              <PlayArrowOutlinedIcon
                className="left-slider-button "
                onClick={() => {
                  if (sliderIndex1 == 0) {
                    return;
                  }
                  setsliderIndex1(sliderIndex1 - 1);
                }}
              />
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            variants={{
              hidden: {
                opacity: 0,
                // x: -50,
              },
              visible: {
                opacity: 1,
                // x: 0,
              },
            }}
            transition={{
              duration: 1,
            }}
            whileInView="visible"
            id="main-landing-5"
          >
            <motion.div
              initial="hidden"
              variants={{
                hidden: {
                  default: "easeIn",
                  x: -50,
                  opacity: 0,
                },
                visible: {
                  default: "easeIn",
                  x: 0,
                  opacity: 1,
                },
              }}
              transition={{
                duration: 1,
              }}
              whileInView="visible"
              className="video-heading"
              style={{}}
            >
              <span className="video-heading-child">
                Glimpses of Sparsh 2K22
              </span>
            </motion.div>
            <video
              width="90%"
              height="100%"
              className="landing-5-video"
              autoplay="autoplay"
              muted
              loop
            >
              <source src="/Videos/demo.mp4" type="video/mp4"></source>
            </video>
          </motion.div>
          {matches ? <SliderMobile /> : <Slider />}
        </>
      )}
    </>
  );
}
