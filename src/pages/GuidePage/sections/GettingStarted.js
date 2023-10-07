import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const GettingStarted = () => {
  return (
    <StyledSection>
      <div className="wrapper">
        <h2 id="Getting-Started">Getting Started</h2>
        <div className="container">
          <h3 id="Quick-Creating-An-Account">Creating An Account</h3>
          <p>Let's get you started organizing your project. First, we will need to create an account. Navigate to the <a href="/signup" target="_blank" rel="noopener noreferrer">Sign Up Page</a>, and put in some information.  What you'll need, <ul>
            <li>A username</li>
            <li>A valid email address</li>
            <li>A password</li> 
          </ul>
          After successfully creating an account, you should be lead to the login page. Using your new username and password, log in and let's begin!
        </p>
        </div>
        <div className="container">
          <h3 id="Quick-Creating-A-Project">Create A Project</h3>
          <p>After we've successfully created an account and logged in, it's time to get to work. 
            After you are logged in you should be lead to the Home Page. 
            This is where your projects will be displayed. 
            Currently projects are displayed cronologically from the most recent updates.
          </p>
          <p>So to create a new project, click on the plus icon on the left side menu. This will navigate you to the
            <a href="/create-project" target="_blank" rel="noopener noreferrer"> Create Project Page</a>.</p>
            <p>Once on the Create Project Page, you can begin adding the information for your project. There are several fields. Required information includes 
              <ul>
                <li>A title</li>
              </ul>
              Optional fields are 
              <ul>
                <li>An image</li>
                <li>A website</li>
                <li>A repository</li>
                <li>A description</li>
              </ul>
              This information is optional because it is not immediately nessecary to starting your project and may not have been thought of yet. You can add these at a later time.
            </p>
            <p>Press the 'Start' button and we're off. Your project should be successfully created. We can now navigate back to the Home Page.</p>
        </div>
        <div className="container">
          <h3 id="Quick-Create-Tickets">Create Tickets</h3>
          <p>Guide you and your team towards a goal. Start a sprint and designate tickets that need to be done to reach a 
            specific outcome. </p>
        </div>
        <div className="container">
          <h3 id="#Quick-Adding-Members">Adding Members</h3>
          <p>Leave comments to add notes or communicate with team mates. You can leave a comment on the project as a whole or on the specific ticket you are working on.</p>
        </div>
      </div>
    </StyledSection>
  )
}

const StyledSection = styled.section`
  margin: 10px;
  display: flex;
  position: relative;
  h4 {
    color: ${palette.accentColor};
  }
`;