import React, { useEffect } from 'react';
import { getAllDogsService } from '../../service/dogs.service';
import { Link } from 'react-router-dom';

function DogList() {
  const [dogState, setDogState] = React.useState([]);

  async function getAllDogs() {
    const {data: dogs} = await getAllDogsService();
    setDogState(dogs);
  }

  useEffect(() => {
    getAllDogs();
  }, []);

  return (
    <div>
      {dogState.map((dog) => {
        return (
          <div key={dog._id}>
            <img src={dog.image_url} alt={dog.name} className="img"></img>
            <h2>Name: {dog.name}</h2>
            <h3>Age: {dog.age}</h3>
            <h3>Breed: {dog.breed}</h3>
            <Link to={`/api/dogs/${dog._id}`}>View details</Link>
          </div>
        );
      })}
    </div>
  );
}

export default DogList;
