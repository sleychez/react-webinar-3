import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";

function Product({ product, onAdd }) {
  const cn = bem("Product");

  return (
    <div className={cn()}>
      <div>{product.description}</div>
      <div>
        Страна производитель:{" "}
        <span className={cn("info")}>
          {product.madeIn?.title} ({product.madeIn?.code})</span>
      </div>
      <div>
        Категория: <span className={cn("info")}>{product.category?.title}</span>
      </div>
      <div>
        Год выпуска: <span className={cn("info")}>{product.edition}</span>
      </div>
      <div className={cn("price")}>
        Цена: <span>{numberFormat(product.price)} ₽</span>
      </div>
      <button className={cn("button")} onClick={() => onAdd(product._id)}>Добавить</button>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};


Product.defaultProps = {
  onAdd: () => {}
};

export default memo(Product);