import React, { useEffect } from "react";
import { getAllDogsService } from "../../service/dog.service";
import { Link } from "react-router-dom";
import "./dogList.css";

function DogList() {
  const [dogState, setDogState] = React.useState([]);

  async function getAllDogs() {
    const { data: dogs } = await getAllDogsService();
    setDogState(dogs);
  }

  useEffect(() => {
    getAllDogs();
  }, []);

  return (
    <div className="dog-list">
      {dogState.map((dog) => {
        return (
          <div key={dog._id} className="dog-card">
            <div>
              <Link to={`/dogs/${dog._id}`}>
                <img
                  src={dog.dogImage}
                  alt={dog.name}
                  className="dog-img"
                ></img>
              </Link>
            </div>
            <div className="dog-details">
              <h2 className="dog-title">{dog.name}</h2>
              <h3>
                Age: <span className="dog-info">{dog.age} years old</span>
              </h3>
              <h3>
                Breed: <span className="dog-info">{dog.breed}</span>
              </h3>
              <h3>
                Gender: <span className="dog-info">{dog.gender}</span>
              </h3>
            </div>
            <Link className="view-button" to={`/dogs/${dog._id}`}>
              View details
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default DogList;
