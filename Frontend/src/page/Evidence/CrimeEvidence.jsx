import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { DetailsContext } from "../../context/DetailsContext";
import styles from "./CrimeEvidence.module.css";
import CardEvidence from "../../components/card/CardEvidence/CardEvidence";
import CardEvidence2 from "../../components/card/CardEvidence2/CardEvidence2";

const CrimeEvidence = () => {
  const { evidence } = useContext(DetailsContext);
  const [cameraEvidence, setCameraEvidence] = useState([]);

  const categories = [
    {
      img_url: "https://i.imgur.com/7NXZD71.png",
      name: "All",
    },
    {
      img_url: "https://i.imgur.com/7NXZD71.png",
      name: "Gun",
    },
    {
      img_url: "https://i.imgur.com/ViQfcxb.png",
      name: "Fire",
    },
    {
      img_url: "https://i.imgur.com/Z6vk1wg.png",
      name: "Number Plate",
    },
    {
      img_url: "https://i.imgur.com/S5cg6iS.png",
      name: "Criminal",
    },
  ];

  useEffect(() => {
    setCameraEvidence(evidence);
  }, [evidence]);

  const handleSelection = (e) => {
    const query =
      e.target.innerText == "Gun"
        ? "Gun detected"
        : e.target.innerText == "Fire"
        ? "Fire detected"
        : e.target.innerText == "Number Plate"
        ? "number_plate"
        : e.target.innerText == "Criminal"
        ? "Criminal detected"
        : "all";
    if (query === "all") return setCameraEvidence(evidence);
    else {
      const filterEvidences = evidence.filter((item) => item.crime === query);
      setCameraEvidence(filterEvidences);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#DCF2F1",
        padding: "4rem 1rem",
        borderRadius: "30px 30px 30px 30px",
      }}
    >
      <div className={styles.one}>
        <h1 className={styles.headline}>Activity Evidence</h1>
      </div>
      <div className={styles.evidenceContainer}>
        <div className={styles.categories}>
          {categories.map((category, idx) => (
            <div
              key={idx}
              className={styles.category}
              onClick={handleSelection}
            >
              <img
                src={category.img_url}
                alt={category.name}
                className={styles.icon}
              />
              <div>{category.name}</div>
            </div>
          ))}
        </div>
        <div className={styles.evidences}>
          {cameraEvidence.map((evi, idx) => (
            // <CardEvidence key={idx} evi={evi} />
            <CardEvidence2 key={idx} evi={evi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrimeEvidence;
