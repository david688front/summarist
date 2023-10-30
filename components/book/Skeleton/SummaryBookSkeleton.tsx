import Skeleton from "./Skeleton";

function SummaryBookSkeleton() {
  return (
    <div className="row">
      <div className="container">
        <div className="book__wrapper">
          <div className="book__description__container">
            <div className="book__description__title">
              <Skeleton width={"706px"} height={"95px"} />
            </div>
            <div className="book__description__author">
              <Skeleton width={"706px"} height={"24px"} />
            </div>
            <div className="book__description__subtitle">
              <Skeleton width={"706px"} height={"30px"} />
            </div>

            <div className="book__description__icons__container">
              <div className="book__description__icons__inner--container">
                <Skeleton width={"400px"} height={"60px"} />
              </div>
            </div>

            <div className="book__btn--container">
              <button className="book--read__btn">
                <Skeleton width={"144px"} height={"48px"} />
              </button>
              <button className="book--read__btn">
                <Skeleton width={"144px"} height={"48px"} />
              </button>
            </div>

            <div className="bookmark__container">
              <Skeleton width={"706px"} height={"27px"} />
            </div>

            <div className="book--tags__container">
              <Skeleton width={"706px"} height={"48px"} />
            </div>

            <div className="book__description">
              <Skeleton width={"706px"} height={"216px"} />
            </div>

            <h2 className="book--author--about"></h2>

            <div className="book--author--description">
              <Skeleton width={"706px"} height={"192px"} />
            </div>
          </div>

          <div className="book--outer--img__container">
            <figure className="book--inner--img__container">
              <Skeleton width={"300px"} height={"300px"} />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SummaryBookSkeleton;
