/*
 * @Author: Jing
 * @Date: 2024-04-28 2:00 pm
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-04-29 21:27:00
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';




function Recommd() {

    const [recommd, setRecommd] = useState([]);

    useEffect(() => {
        getRecommd()
    }, []);

    const getRecommd = async () => {

        const check = localStorage.getItem('recommd');
        if (check) {
            setRecommd(JSON.parse(check)); 
        } else { // sign up and insert API key here
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=<Sign up and insert API key here>&number=10`);
            const data = await api.json();
            localStorage.setItem('recommd', JSON.stringify(data.recipes));
            console.log(data);
            setRecommd(data.recipes);
        }
    }

    return (
        <div>
            <Wrapper>
                <h4>Popular Recipes</h4>
                <Splide
                    options={{
                        perPage: 4,
                        arrow: false,
                        Pagination: false,
                        drag: "free",
                        gap: " 4rem",
                    }}>
                    {recommd.map((recipe) => {
                        return (
                            <SplideSlide>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>

            </Wrapper>
        </div>
    );
}


const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height:15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0 ;
        wideth: 100%;
        height:100%;
        object-fit: cover;
    }
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items:center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: liner-gradient(rgba(0,0,0,0) rgba(0,0,0,0.5));
`

export default Recommd;

