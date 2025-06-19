import React, { useState, useEffect } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";
import { Spinner } from "react-bootstrap"; // Add this import

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchSkills = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("https://hellbat.pythonanywhere.com/skills");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                  {skills.map((skill, index) => (
                    <div className="item" key={index}>
                      <img src={`https://hellbat.pythonanywhere.com/${skill.img}`} alt="Image" />
                      <h5>{skill.title}</h5>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
