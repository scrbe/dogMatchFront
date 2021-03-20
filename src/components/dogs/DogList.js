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
            <Link to={`/dogs/${dog._id}`}>
              <img src={dog.dogImage} alt={dog.name} className="dog-img"></img>
            </Link>
            <h2>Name: {dog.name}</h2>
            <h3>Age: {dog.age} years old</h3>
            <h3>Breed: {dog.breed}</h3>
            <h3>Gender: {dog.gender}</h3>
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
