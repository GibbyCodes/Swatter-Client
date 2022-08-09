import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js'

// components
import Comment from '../components/Comment';

// functions
import { unauthorized } from '../../../functions/unauthorized.js';

export default function CommentSection({ user, role, bugId, projectId, setLoading }) {

    const [ addComment, setAddComment] = useState('');
    const [ addAuthor ] = useState(user);
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        const getComments = (projectId, bugId) => {
            axios.get(`${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
            .then(function (response){
                setComments(response.data[0].bugs[0].comments);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getComments(projectId, bugId);
    }, [ projectId, bugId, setLoading ]);

    const sendComment = () => {
        setLoading(true);
        if(addComment === ''){
            setLoading(false);
            alert("No Comment Entered!");
        } else {
            axios.post(`${process.env.REACT_APP_BUG_COMMENT_URL}/${projectId}/${bugId}/comments`, {
                projectId: projectId,
                bugId: bugId,
                comment: addComment,
                author: addAuthor,
            })
            .then(function(response) {
                if(response.data !== "Comment created!"){
                    setLoading(false);
                    alert("Server Error - Comment not created!");
                } else {
                    setLoading(false);
                    document.getElementById("comment").value = "";
                    let container = document.getElementById("bug-comment-container");
                    setTimeout(function(){
                        container.scrollTo(0, document.body.scrollHeight);
                        setAddComment("");
                    }, 1000);
                }
            })
        }
    }

    return (
        <StyledBugCommentSection className='bug-page-tabs active' id="comments">
            <div className="comment-section-wrapper">
                { 
                    comments.length === 0
                    ? <h2>No comments yet..</h2>
                    : 
                    <div className="comment-container" id="bug-comment-container">
                        {
                            comments.map((comment, key) => {
                                return (
                                    <Comment
                                        date={comment.date}
                                        author={comment.author}
                                        comments={comment.comment}
                                        commentId={comment._id}
                                        bugId={bugId}
                                        user={user}
                                        projectId={projectId}
                                        key={key}
                                        role={role}
                                        setLoading={setLoading}
                                    />
                                )
                            })
                        }
                    </div>
                }
                <div className="comment-maker">
                    <textarea 
                        placeholder='Add a comment'
                        name="comment" 
                        id="comment" 
                        required
                        cols={200}
                        onChange={(event) => {
                            setAddComment(event.target.value);
                        }}
                    />
                    {
                        role !== process.env.REACT_APP_ADMIN_SECRET || process.env.REACT_APP_USER_SECRET
                        ? <button onClick={()=> { sendComment();}}>Send</button>
                        : <button onClick={()=> { unauthorized();}}>Send</button>
                    }
                </div>
            </div>
        </StyledBugCommentSection>
    )
}

const StyledBugCommentSection = styled.div`
    width: 40%;
    margin: 20px 0;
    height: 100%;
    min-height: 30vh;
    @media (max-width: 1440px){
    }
    @media (max-width: 834px){
        width: 70%;
    }
    @media (max-width: 428px){
        width: 100%;
    }
    .comment-section-wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        min-height: 30vh;
        flex-direction: column;
        align-items: center;
        h2 {
            color: ${pallette.helperGrey};
            font-size: 16px;
            font-weight: 400;
            margin-right: auto;
        }
        .comment-container {
            width: 100%;
            max-height: 400px;
            overflow-y: auto;
            @media (max-width: 428px){
                max-height: 40vh;
            }
        }
        .comment-maker {
            margin: 20px 0;
            display: flex;
            justify-content: center;
            textarea {
                border-radius: 4px 0 0 4px;
                background: #d6d6d6;
                padding: 6px;
                min-height: 20px;
                height: auto;
                width: 100%;
                max-width: 500px;
                max-height: 50px;
                font-size: 12px;
                @media (max-width: 834px){
                    width: 300px;
                }
                @media (max-width: 428px){
                    width: 250px;
                    height: 30px;
                }
            }
            button {
                margin: 0;
                width: 100px;
                cursor: pointer;
                color: #0f4d92;
                background: white;
                border: none;
                border-radius:0 4px 4px 0;
                font-size: 14px;
                font-weight: 700;
                transition: 0.2s;
                &:hover {
                    background: #000000;
                    color: white;
                }
                @media (max-width: 428px){
                    width: 80px;
                }
            }
        }
    }
`;