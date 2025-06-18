import { FC } from "react"

import ProductCard from "../product-card/product-card.component"

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles"

import { CategoryItem } from "../../store/categories/categories.types"

type CategoriesPreviewProps = {
  title: string
  products: CategoryItem[]
}

const CategoryPreview: FC<CategoriesPreviewProps> = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview
