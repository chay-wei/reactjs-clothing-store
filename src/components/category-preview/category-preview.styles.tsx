import styled from "styled-components"

import { Link } from "react-router-dom"

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`

export const Preview = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 50px;

  @media (min-width: 575px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`
