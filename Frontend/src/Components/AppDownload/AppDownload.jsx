import { assets } from '../../assets/assets.js';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/>Tomato App</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store }></img>
            <img src={assets.app_store}></img>
        </div>
    </div>
  )
}

export default AppDownload