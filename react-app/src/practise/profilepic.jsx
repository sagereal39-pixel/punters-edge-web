function Profile() {
  const imageUrl = './src/assets/ass5.jpg';

  const click = (e) => (e.target.style.display = 'none');

  return <img onClick={(e) => click(e)} src={imageUrl}></img>;
}

export default Profile;
