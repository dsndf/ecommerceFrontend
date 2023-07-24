import React from "react";
import "../styles/Stepper.scss";
import { Stepper, Step } from "react-form-stepper";
import { FaShippingFast } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiSelectMultiple } from "react-icons/bi";
const StepperCompo = ({ step }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <FaShippingFast />,
    },
    {
      label: "Confirm Order",
      icon: <BiSelectMultiple />,
    },
    {
      label: "Payment",
      icon: <MdAccountBalanceWallet />,
    },
  ];
  return (
    <div className="ship">
      <Stepper
        style={{ paddingTop: "15px" }}
        activeStep={step}
        className="stepper"
        stepClassName="allSteps"
        connectorStyleConfig={{
          size: "1px",
          activeColor: "black",
          completedColor: "black",
        }}
        styleConfig={{
          activeBgColor: "#fff",
          activeTextColor: "black",
          inactiveBgColor: "#fff",
          inactiveTextColor: "rgba(185, 185, 185, 0.47)",
          circleFontSize: "25px",
         labelFontSize:"15px",
          completedTextColor: "black",
          completedBgColor: "#fff",
        }}
        connectorStateColors={true}
      >
        {steps.map((v, ind) => {
          return (
            <Step key={ind} label={v.label}>
              {v.icon}
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default StepperCompo;
