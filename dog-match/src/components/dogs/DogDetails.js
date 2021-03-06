import React from 'react';
import {getOneDogService} from '../../service/dogs.service'
import {useParams} from 'react-router-dom'

function DogDetails() {
    const params = useParams();
    const { dogId } = params;
    const [dog, setDog] = React.useState([]);
  
    const getOneDog = async (dogId) => {
        const {data: dog} = await getOneDogService(dogId);
        console.log('DOG -->',dog)
        setDog(dog);
    }
  
    React.useEffect(() => {
        getOneDog(dogId);
    },[]);
    
  return (
      <div key={dog._id}>
           <img src={dog.image_url} alt={dog.name} className="img"></img>
            <h2>Name: {dog.name}</h2>
            <h3>Age: {dog.age}</h3>
            <h3>Breed: {dog.breed}</h3>
        </div>
  );
}

export default DogDetails;
