import React, { useState } from 'react';
function Component() {
  const [name, setName] = useState('Guest');
  const [age, setAge] = useState(0);
  const [isEmployed, setIsEmployed] = useState(false);

  const updateName = () => {
    setName('Sage');
  };

  const increaseAge = () => {
    setAge(age + 1);
  };

  const employedStatus = () => {
    setIsEmployed(!isEmployed);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={updateName}>Set Name</button>

      <p>Age: {age}</p>
      <button onClick={increaseAge}>Increase Age</button>

      <p>Is Employed: {isEmployed ? 'Yes' : 'No'}</p>
      <button onClick={employedStatus}>Check Employment</button>
    </div>
  );
}

export default Component;
