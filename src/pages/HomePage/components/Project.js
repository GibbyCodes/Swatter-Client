// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// router
import { Link } from "react-router-dom";

// images
import PlaceholderImage from "../../../assets/images/imagePlaceholder.png";

// functions
import { handleDate } from "../../../functions/handleDates";

export default function Project({ project }) {

  return (
    <StyledProject>
      <Link className='project-image-link' to={`/projects/${project._id}`}>
        <img
          className='project-image'
          src={!project.image ? PlaceholderImage : project.image}
          alt={project.title}
        />
      </Link>
      <div className="text-container">
        <Link to={`/projects/${project._id}`}>{project.title}</Link>
        {
          project.lastUpdate 
          ? <h2>Updated: {handleDate(project.lastUpdate)}</h2>
          : <></>
        }
      </div>
    </StyledProject>
  );
}

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: #5c5c5c73;
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #0e1a28;
  &:hover {
    border: 1px solid white;
  }
  @media (max-width: 450px) {
    flex-direction: row;
    align-items: center;
    padding: 6px;
  }
  .project-image-link {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 275px;
    max-height: 275px;
    height: 100%;
    margin-bottom: 8px;
    @media (max-width: 450px) {
      height: 100px;
      width: 150px;
      min-height: 70px;
      margin-bottom: 0;
    }
    .project-image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
    }
  }
  @media (max-width: 450px) {
    justify-content: center;
    margin-left: 6px;
  }
  .text-container {
    display: flex;
    position: relative;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    @media (max-width: 450px){
      justify-content: center;
      margin-left: 6px;
    }
    a {
      font-size: ${palette.subtitleSize};
      color: white;
      font-weight: 400;
      @media (max-width: 450px){
        font-size: 1em;
        margin-bottom: 0;
      }
    }
    h2 {
      font-size: .8em;
      color: white;
      font-weight: 200;
    }
  }
`;
