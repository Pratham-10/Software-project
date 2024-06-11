import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRide } from "./Ridecontext";
import "./About.css";
import vanshitImage from "../uploadss/image.jpg";
import varunImage from "../uploadss/varun.jpeg";
import ushmayImage from "../uploadss/ushmay.jpg";
import prathamImage from "../uploadss/Pratham.jpg";
import yaxImage from "../uploadss/yax.jpg";
const About = () => {
  return (
    <div className="about">
      <div className="about-box">
        <div className="about-heading">
          <div className="about-style">About Us</div>
        </div>
        <div className="about-text">
          <div className="about-textstyle">
            We are Gratler. It is a platform that makes your traveling easier
            and inexpensive, rather free. Yes! you heard that right. Gratler is
            a tech company which primarily focuses on connecting the physical
            and digital world to facilitate movement at an ease of a click. We
            are targeting enhanced security, safety and we support your right to
            move and work freely and without fear, regardless of your gender,
            colour, religion, ability, or sexual orientation.
          </div>
        </div>
      </div>

      <div className="photoss">
        <div className="photo-cfo">
          <img
            src={vanshitImage}
            alt="photooo"
            style={{ width: "243px", height: "263px" }}
          />
        </div>
        <div className="photo-cfo">
          <img
            src={varunImage}
            alt="photooo"
            style={{ width: "243px", height: "263px" }}
          />
        </div>
        <div className="photo-cfo">
          <img
            src={ushmayImage}
            alt="photooo"
            style={{ width: "243px", height: "263px" }}
          />
        </div>
        <div className="photo-cfo">
          <img
            src={prathamImage}
            alt="photooo"
            style={{ width: "243px", height: "263px" }}
          />
        </div>
        <div className="photo-cfo">
          <img
            src={yaxImage}
            alt="photooo"
            style={{ width: "243px", height: "263px" }}
          />
        </div>
      </div>

      <div className="name-cfo">
        <div className="cfo-1">Vanshit Shah</div>
        <div className="cfo-1">Varun Parekh</div>
        <div className="cfo-1">Ushmay Patel</div>
        <div className="cfo-1">Pratham Lalwani</div>
        <div className="cfo-1">Yax Prajapati</div>
      </div>
    </div>
  );
};

export default About;
