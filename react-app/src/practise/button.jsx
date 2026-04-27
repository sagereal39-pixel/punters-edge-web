function Button() {
  let count = 0;

  const click = (name) => {
    if (count < 3) {
      count++;
      console.log(`${name} You clicked me ${count} times`);
    } else {
      console.log(`${name} stop clicking me`);
    }
  };
  return <button onClick={() => click('Sage')}>Click Here</button>;
}

export default Button;
