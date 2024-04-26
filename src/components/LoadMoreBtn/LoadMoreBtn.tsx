import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button className={css.loadMoreBtn} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
