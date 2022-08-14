import React from "react";

import "./style.scss";
import { services } from "../../store/constants";
import ServiceParallax from "./ServiceParallax/ServiceParallax";

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-header-text">SERVICES</h1>
      {services.map((service) => (
        <ServiceParallax service={service} key={service.name} />
      ))}
    </div>
  );
};

export default Services;
