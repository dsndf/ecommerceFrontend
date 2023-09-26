import React from "react";
import "../styles/About.scss";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
const About = () => {
  return (
    <div className="about">
      <div>
        <div>
          <h1>I Am Gaurav Jain</h1>
          <h3>MERN STACK DEVELOPER</h3>
        </div>

        <ul>
          <li>
            <a href="https://linkedin.com/in/gaurav-jain-96125824b/" target="">
              <AiFillLinkedin />
            </a>
          </li>
          <li>
            <a href="https://github.com/dsndf" target="">
              <AiFillGithub />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
