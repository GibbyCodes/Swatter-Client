// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js';

export default function ImageSection({ images, handleModal }) {

    return (
        <StyledImageSection className='bug-page-tabs' id="images">
            {
                images === undefined || images.length === 0 
                ? <h2>No Images</h2>
                : <div className="images-wrapper">
                    { 
                        images.map((image, index) => {
                            return (
                                <div key={index}>
                                    <div className="image-container">
                                        {
                                            image.image === "" 
                                            ? <h2>No Images</h2>
                                            : <img src={image.image} onClick={() => { handleModal(index)} } alt={image.caption}/>
                                        }
                                        {
                                            image.caption.length > 50 
                                            ? <p>{image.caption.slice(0, 50)}...</p>
                                            : image.image === "" && image.caption === "" ? <></>
                                            : image.caption.length === 0 ? <p>No Caption</p>
                                            : <p>{image.caption}</p>
                                        }
                                    </div>
                                    <div className="modal" id={index}>
                                        <button className="close-button" onClick={() => { handleModal(index)} }>&times;</button>
                                        <img className="modal-image" src={image.image} alt={image.caption} />
                                        <p id="caption">{image.caption}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </StyledImageSection >
    )
}

const StyledImageSection = styled.div`
    display: none;
    height: 100%;
    width: 100%;
    margin: 20px auto auto auto;
    border: 1px soild ${pallette.helperGrey};
    @media (max-width: 834px){
        width: 90%;
    }
    @media (max-width: 428px){
        margin: 0;
    }
    h2 {
        color: ${pallette.helperGrey};
            font-size: 16px;
            font-weight: 400;
            margin-right: auto;
    }
    .images-wrapper {
        display: flex;
        grid-gap: 20px;
        margin: 0 0 20px 0;
        width: 70%;
        height: auto;
        overflow-x: auto;
        @media (max-width: 850px){
            width: 90%;
        }
        @media (max-width: 450px){
            width: 100%;
        }
        .image-container {
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 300px;
            img {
                cursor: pointer;
                width: 100%;
                height: 80%;
            }
            p {
                padding-top: 6px;
                min-height: 20%;
                font-size: 12px;
                text-align: center;
                color: white;
                background: #2c272771;
            }
        }
        .modal {
            display: none; 
            position: fixed; 
            z-index: 1; 
            padding-top: 100px; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.9); 
            .modal-image {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                }
            #caption {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                text-align: center;
                color: ${pallette.helperGrey};
                padding: 10px 0;
                height: 150px;
            }
            .close-button {
                position: absolute;
                top: 15px;
                right: 35px;
                color: #f1f1f1;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                background: none;
                border: none;
            }
        }
    }
`;