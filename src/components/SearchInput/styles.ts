import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #2D56B2;
  border-radius: 0.5rem;
  padding-left: 0.25rem;
  min-width: 14rem;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  margin: 0;
  padding: 0.5rem;
  font-size: 1rem;
  color: inherit;
  border: 1px solid transparent;
  border-radius: inherit;
  
  &::placeholder {
    color: #bbb;
  }
`;
