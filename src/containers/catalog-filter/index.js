import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import {createCategoryList} from "../../utils";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store])
  };

  const categoryList = createCategoryList(select.categories);

  function getCategoryListArray(connection, level = 0, arr = [{ value: "", title: "Все" }]) {
    const indent = "- ".repeat(level * 1);
    for (let key in connection) {
      if (connection.hasOwnProperty(key) && connection[key].id !== undefined) {
        arr.push({ value: connection[key].id, title: indent + key });
        if (typeof connection[key] === "object" && connection[key] !== null) {
          getCategoryListArray(connection[key], level + 1, arr);
        }
      }
    }
    return arr;
  }

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'}
    ]), []),
    categories: useMemo(() => getCategoryListArray(categoryList), [categoryList])
  };

  const {t} = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={options.categories}
        value={select.category}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
        theme="big"
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
