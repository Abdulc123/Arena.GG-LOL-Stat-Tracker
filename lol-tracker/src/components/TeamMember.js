import PropTypes from 'prop-types';
import '../css/About.css';

const TeamMember = ({ name, role, caption, imageSrc }) => {
  return (
    <div className="teamMember">
      <img src={imageSrc} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <p className="caption">{caption}</p>
    </div>
  );
};

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default TeamMember;
