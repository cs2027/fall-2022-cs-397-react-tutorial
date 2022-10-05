import './Banner.css';

const Banner = ({ title, open }) => (
  <h1 className={`banner-title ${open ? 'blur' : ''}`}>{title}</h1>
);

export default Banner;
