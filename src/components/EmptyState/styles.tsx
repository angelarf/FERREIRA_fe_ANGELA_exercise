import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    flex: 1;
    margin: 3rem 1.25rem;
`;

export const Title = styled.p`
  color: #000;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 120%;

  margin: 1rem;
`;

export const Text = styled.span`
  color: #434343;
  text-align: center;
  font-size: 1rem;
`;
