import CreateRoseBudThorn from './CreateRoseBudThorn'
import ListLatestEntries from './ListLatestEntries'

export default function HomePage() {

    //homepage: display photo and renders CreateRoseBudThron.jsx & ListLatestEntries.jsx

  return (
    <div>

      <img
        src="https://i.etsystatic.com/9472596/r/il/749ea1/3821016144/il_1588xN.3821016144_csuf.jpg" 
        alt='bouquet of flowers' 
        style={{ width: '200px', height: 'auto', marginTop: '10px'}}
      />

      <CreateRoseBudThorn />

      <ListLatestEntries />

    </div>
  )
}

//FUTURE PLANS:
//add styling
