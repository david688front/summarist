import Skeleton from "./Skeleton";

function BooksCardSkeleton() {
  return (
    <div className="recommended--books__container--skeleton">
      {new Array(5).fill(0).map((_, index) => (
        <div key={index}>
          <div>
            <figure className="book__image--wrapper">
              <Skeleton width={"172px"} height={"172px"} />
            </figure>
            <div className="recommended__book--title">
              <Skeleton width={"172px"} height={"72px"} />
            </div>
            <div className="recommended__book--author">
              <Skeleton width={"172px"} height={"21px"} />
            </div>
            <div className="recommended__book--subtitle">
              <Skeleton width={"172px"} height={"42px"} />
            </div>
            <div className="recommended__book--details-wrapper">
              <div className="recommended__book--details">
                <Skeleton width={"172px"} height={"21px"} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BooksCardSkeleton;
