import styled from "styled-components"

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media (min-width: 575px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const CategoryTitle = styled.div`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`
