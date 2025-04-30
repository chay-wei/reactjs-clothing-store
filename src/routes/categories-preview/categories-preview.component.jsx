import { useSelector } from "react-redux"

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector"
import CategoryPreview from "../../components/category-preview/category-preview.component"
import Spinner from "../../components/spinner/spinner.component"

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((key) => {
          const products = categoriesMap[key]
          return <CategoryPreview key={key} title={key} products={products} />
        })
      )}
    </>
  )
}

export default CategoriesPreview
