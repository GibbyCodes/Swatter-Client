import styled from "styled-components";
import * as palette from '../../styled/ThemeVariables.js';

// components
import { MainNavbar } from "./components/GuideNavBar.js";

// sections
import { IntroSection } from "./sections/IntroSection.js";
import { GettingStarted } from "./sections/GettingStarted.js";
import { ProfileSection } from "./sections/ProfileSection.js";
import { ProjectSection } from "./sections/ProjectSection.js";
import { TicketSection } from "./sections/TicketSection.js";
import { SprintSection } from "./sections/SprintSection.js";

export const GuidePage = () => {
  return (
    <StyledPage>
      <MainNavbar />
      <div>
        <header className="title-container">
          <h1>Swatter Project Management</h1>
          <p>Project management is the goal of Swatter. Organizing and paving the way to meet your goals and create better outcomes. </p>
        </header>
        <IntroSection />
        <GettingStarted />
        <ProfileSection />
        <ProjectSection />
        <TicketSection />
        <SprintSection />
      </div>
    </StyledPage>
  )
}

const StyledPage = styled.section`
  margin: 10px;
  display: flex;
  position: relative;
  a {
    cursor: pointer;
  }
  h1, h2 {
    color: white;
  }
  p {
    color: ${palette.helperGrey};
    font-size: .8em;
  }
  .title-container {
    margin-bottom: 20px;
    text-align: center;
    h1 {
      font-size: 2em;
    }
    p {
      max-width: 600px;
      margin: auto;
    }
    h2 {
      font-size: 2em;
      border-bottom: ${palette.accentBorder2px};
      width: 50%;
      margin: 10px auto;
    }
  }
`;