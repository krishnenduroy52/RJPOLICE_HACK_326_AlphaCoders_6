import React from 'react'
import { useEffect, useContext } from 'react'
import { DetailsContext } from '../../context/DetailsContext'

const CrimeEvidence = () => {
    const { evidence } = useContext(DetailsContext);
    useEffect(() => {
        console.log(evidence);
        const filterEvidences = evidence.filter(item => item.crime === "Fire detected"); //d is small
        console.log(filterEvidences);
    }, [evidence]);

    const categories = [
        {
            "img_url": "",
            "name": "Gun" 
        },
        {
            "img_url": "",
            "name": "Fire" 
        },
        {
            "img_url": "",
            "name": "License Plate" 
        }
    ]

    const handleSelection = (e) =>{

    }
    return (
        <div
            style={{
                backgroundColor: "#F8F6F5",
                padding: "4rem 1rem",
                borderRadius: "30px 30px 30px 30px",
            }}
        >
            <div>CrimeEvidence</div>
            <div className="evidence-container">
                <div className="categories">
                    {categories.map((category) => (
                        <div className="category" onClick={handleSelection}>
                            <img src={category.img_url} alt={category.name} />
                            <div>{category.name}</div>
                        </div>
                    ))}
                </div>
                <div className="evidences">

                </div>
            </div>
        </div>
    )
}

export default CrimeEvidence