import { Field, Form, Formik, FormikHelpers } from "formik";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  onSetSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSetSearchQuery }) => {
  const handleSubmit = (
    values: { query: string },
    { resetForm }: FormikHelpers<{ query: string }>
  ) => {
    const { query } = values;
    if (query.trim() !== "") {
      onSetSearchQuery(query.trim());
    } else {
      toast.error("Please enter a search query!");
    }
    resetForm();
  };

  return (
    <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
      <Form className={css.header}>
        <div className={css.searchContainer}>
          <Field
            className={css.inputField}
            placeholder="Search images and photos"
            type="text"
            name="query"
          />
          <button type="submit" className={css.searchBoxBtn}>
            <IoSearch />
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default SearchBar;
