import { assets } from '../../assets/assets';
import './Footer.css';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo}></img>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim cupiditate laboriosam numquam nostrum earum et ducimus, incidunt quae obcaecati dolorem iste natus assumenda dolore sapiente modi esse architecto dolor.</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivary</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>987658889</li>
                    <li>abc@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr></hr>
        <p className='footer-copyright'>Copyright 2024 Tomato.com -All Right Reserved.</p>
    </div>
  )
}

export default Footer