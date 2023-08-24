import { useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// router
import { useNavigate } from "react-router-dom";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// functions
import { handleDeleteAlert } from "../../../../functions/handleDeleteAlert.js";

// components
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { ButtonContainer } from "./components/ButtonContainer.js";

// loaders
import Loader from "../../../../loaders/Loader.js";

// redux
import { connect } from "react-redux";

const EditProject = ({ user, setEditing, isLoading, setLoading, project, projectId }) => {
  
  const navigate = useNavigate();

  const DeleteAlertRef = useRef();

  const deleteProject = () => {
    setLoading(true);
    axios.delete(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/delete`,
    {
      headers: {
        Authorization: user.token
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  const [ title, setTitle ] = useState(project.title);
  const [ link, setLink ] = useState(project.link);
  const [ image, setImage ] = useState(project.image);
  const [ description, setDescription ] = useState(project.description);
  const [ repository, setRepository ] = useState(project.repository);

  const updateProject = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/edit`,
      {
        title: title,
        link: link,
        image: image,
        repository: repository,
        description: description,
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setEditing(false);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  return (
    <StyledSection>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteProject}
        title={project.title}
      />
      <div className='title-container'>
        <h1>Edit Project</h1>
        <button id="toggle-edit-button" onClick={() => { setEditing(false)}}><img src={EditIcon} alt='edit' /></button>
      </div>
      {
        isLoading ? <Loader />
        : 
        <div className='form-wrapper'>
          <div className="inputs-container">
            <div className='form-container'>
              <label>Title
                <input 
                  type='text' 
                  id='title' 
                  defaultValue={project.title}
                  onChange={(event) => { setTitle(event.target.value); }} 
                />
              </label>
              <label>Image
                <input 
                  type='text' 
                  id='image' 
                  defaultValue={project.image}
                  onChange={(event) => { setImage(event.target.value); }} 
                />
              </label>
            </div>
            <div className='form-container'>
              <label>Website
                <input 
                  type='text' 
                  id='link' 
                  defaultValue={project.link}
                  onChange={(event) => { setLink(event.target.value); }} 
                />
              </label>
              <label>Repository
                <input 
                  type='text' 
                  id='repository' 
                  defaultValue={project.repository}
                  onChange={(event) => { setRepository(event.target.value); }} 
                />
              </label>
            </div>
          </div>
          <label id="description-label">Description
            <textarea 
              id='description' 
              defaultValue={project.repository} 
              onChange={(event) => { setDescription(event.target.value); }} 
            />
          </label>
        </div>
      }
      <ButtonContainer
        editProject={updateProject}
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
      />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 800px;
  margin: 1em auto;
  position: relative;
  .title-container {
    display: flex;
    width: 100%;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
      margin-right: auto;
    }
  }
  .form-wrapper {
    .inputs-container {
      width: 100%;
      margin: 10px auto;
      display: flex;
      justify-content: space-between;
      @media (max-width: 750px) {
        flex-direction: column;
      }
      .form-container {
        width: 45%;
        margin: auto;
        @media (max-width: 750px) {
          width: 100%;
        }
        label {
          display: flex;
          flex-direction: column;
          margin: 10px 0 0 0;
          color: ${palette.labelColor};
          font-size: ${palette.labelSize};
          input {
            width: 100%;
            max-width: 350px;
            font-size: 1em;
            padding: 2px;
            background: ${palette.helperGrey};
          }
        }
      }
    }
    #description-label {
      width: 100%;
      font-size: ${palette.labelSize};
      color: ${palette.labelColor};
      textarea {
        width: 100%;
        height: 100px;
        padding: 2px;
        background: ${palette.helperGrey};
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditProject);