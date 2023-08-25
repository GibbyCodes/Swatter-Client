// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// components
import Ticket from '../../ProjectPage/components/Ticket.js';

// redux
import { connect } from 'react-redux';

const SprintTicketTable = ({ project, searchSprint }) => {

    const ticketStatuses = ['Open', 'Underway', 'Reviewing', 'Completed'];

    const handleSprintFilter = (status) => {
        let sprintArray = [];
        if (searchSprint){
            sprintArray = project.tickets.filter(ticket => ticket.status === status).filter(ticket => ticket.sprint === searchSprint).slice().reverse()
        } else {
            sprintArray = project.tickets.filter(ticket => ticket.status === status)
        }
        return sprintArray;
    }

    return (
        <StyledTicketTable>
            { 
                !project.tickets
                ? <div className="undefined">
                    <h1>You've haven't entered any tickets</h1>
                </div>
                : <>
                    {
                        ticketStatuses.map((status, index) => {
                            return (
                                <div className="tickets-container" key={index}>
                                    <h5>{status} <span>{ handleSprintFilter(status).length}</span></h5>
                                    {
                                        handleSprintFilter(status).map((ticket, index) => {
                                            return (
                                                <Ticket
                                                    ticket={ticket}
                                                    project={project}
                                                    key={index}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </>
            }
        </StyledTicketTable>
    )
}

const StyledTicketTable = styled.div`
    display: grid;
    grid-template-columns: 350px 350px 350px 350px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100%;
    max-height: 93vh;
    width: 100%;
    margin-top: 20px;
    position: relative;
    .tickets-container {
        width: 100%;
        background: black;
        padding: 10px;
        background: #0b2849;
        border-radius: 12px;
        h5 {
            color: ${palette.helperGrey};
            padding: 10px;
            font-size: ${palette.paraSize};
            span {
                font-weight: 400;
            }
        }
        .Open, .Underway, .Reviewing, .Completed {
            display: flex;
            &:hover {
                background: #000000;
                border: 1px black solid;
            }
        }
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SprintTicketTable);