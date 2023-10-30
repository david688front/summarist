import BooksCardSkeleton from "./BooksCardSkeleton";
import Skeleton from "./Skeleton";

function SelectedBooksSkeleton() {
  return (
    <div className="row">
      <div className="container">
        <div className="selected__book__container">
          <div className="section__header__title">Selected just for you</div>
          <Skeleton width={"680px"} height={"180px"} />

          <div>
            <div className="section__header__title">Recommended For You</div>
            <div className="section__header__subtitle">
              We think {"you’ll"} like these
            </div>
            <BooksCardSkeleton />
          </div>
          <div>
            <div className="section__header__title">Suggested Books</div>
            <div className="section__header__subtitle">Browse those books</div>
            <BooksCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SelectedBooksSkeleton;
