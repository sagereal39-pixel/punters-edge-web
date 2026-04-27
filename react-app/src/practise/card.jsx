import profile from './assets/ass5.jpg'

function Card() {
  return (
    <div className='card'>
      <img className='card-image' src={profile} alt='profile picture' />
      <h2 className='card-title'>SageReal</h2>
      <p className='card-text'>JUST HERE LEARNING FROM BRO CODE 😀👏</p>
    </div>
  );
}

export default Card;
