import React from "react";
import Card1 from "../../components/card/card1/Card1";
import style from "./adminDashboard.module.css";

// image import
import cctv from "../../assets/cctv.png";
import cctvMap from "../../assets/cctv_map.png";
import crimeevidence from "../../assets/trial.png";
import Card2 from "../../components/card/card2/Card2";
import gun from "../../assets/gun.png";
import number_plate from "../../assets/number-plate.png";
import accident from "../../assets/accident.png";
import crowd from "../../assets/crowd.png";
import criminal from "../../assets/criminal.png";
import fire from "../../assets/fire.png";
import violence from "../../assets/violence.png";

const cardsData = [
  {
    text: "Crime Evidence",
    imageLink: crimeevidence,
    bodyText:
      "Gather crucial evidence effortlessly to support law enforcement investigations.",
    pathto: "/admin/evidence",
    category: "CCTV Control",
  },
  {
    text: "Car finding using number plate",
    imageLink: number_plate,
    bodyText:
      "Identify vehicles accurately through cutting-edge number plate recognition.",
    pathto: "/admin/detection/number-plate",
    category: "Find Criminal",
  },
  {
    text: "GUN Detection",
    imageLink: gun,
    bodyText:
      "Detect firearms swiftly, enhancing security measures to protect public spaces.",
    pathto: "/admin/detection/gun",
    category: "Suspicious Activity",
  },
  {
    text: "CCTV Surveillance",
    imageLink: cctv,
    bodyText:
      "Security cameras provide constant vigilance, ensuring safety and peace of mind.",
    pathto: "/admin/view/cctv",
    category: "CCTV Control",
  },
  {
    text: "CCTV Location",
    imageLink: cctv,
    bodyText:
      "Monitor and track locations with precision using advanced CCTV technology.",
    pathto: "/admin/map",
    category: "CCTV Control",
  },
  {
    text: "Criminal Detection",
    imageLink: criminal,
    bodyText:
      "Swiftly identify and track potential criminals, ensuring public safety.",
    pathto: "/admin/detection/criminal",
    category: "Find Criminal",
  },
  {
    text: "Crowd Detection",
    imageLink: crowd,
    bodyText:
      "Efficiently monitor and manage crowds, ensuring a secure and organized environment.",
    pathto: "/admin/detection/crowd",
    category: "Suspicious Activity",
  },
  {
    text: "Fire Detection",
    imageLink: fire,
    bodyText:
      "Instantly detect and respond to fire incidents, minimizing potential damage.",
    pathto: "/admin/detection/fire",
    category: "Suspicious Activity",
  },
  {
    text: "Camera Displacement Detection",
    imageLink: cctv,
    bodyText:
      "Detect and address camera displacement issues promptly, maintaining optimal surveillance.",
    pathto: "/admin/detection/camera-displacement",
    category: "CCTV Control",
  },
  {
    text: "Accident Detection",
    imageLink: accident,
    bodyText:
      "Rapidly identify and respond to accidents, ensuring swift emergency services.",
    pathto: "/admin/detection/accident",
    category: "Suspicious Activity",
  },
  {
    text: "Fight / Violence Detection",
    imageLink: violence,
    bodyText:
      "Promptly detect and prevent violence, fostering a safer environment for everyone.",
    pathto: "/admin/detection/violence",
    category: "Suspicious Activity",
  },
];

const AdminDashboard = () => {
  const groupedCards = cardsData.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {});

  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={style.wrapper}>
        <h1 className={style.heading}>Admin Dashboard</h1>

        {Object.entries(groupedCards).map(([category, categoryCards]) => (
          <div key={category}>
            <h1 className={style.category_heading}>{category}</h1>
            <div className={style.cardsWrapper}>
              <div className={style.cards}>
                {categoryCards.map((card) => (
                  <Card2
                    key={card.text}
                    text={card.text}
                    imageLink={card.imageLink}
                    bodyText={card.bodyText}
                    pathto={card.pathto}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
