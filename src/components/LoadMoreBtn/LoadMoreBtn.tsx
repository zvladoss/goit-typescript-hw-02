import { FC } from "react";
import s from "./LoadMoreBtn.module.css";

interface Props {
  onLoadMore: () => void;
  disabled?: boolean;
}

const LoadMoreBtn: FC<Props> = ({ onLoadMore, disabled }) => (
  <button className={s.loadMoreButton} onClick={onLoadMore} disabled={disabled}>
    Load more
  </button>
);

export default LoadMoreBtn;
