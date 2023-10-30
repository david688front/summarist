import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Skeleton from "./Skeleton";

function SummarySkeleton() {
  return (
    <div className="summary__container">
      <div className="audio--summary">
        <h2 className="audio--summary--title">
          <Skeleton width={"752px"} height={"53px"} />
        </h2>

        <div className="audio--summary--text">
          <Skeleton width={"752px"} height={"1434px"} />
          <AiOutlineLoading3Quarters
            style={{ height: "80px", width: "80px" }}
          />
        </div>
      </div>
    </div>
  );
}
export default SummarySkeleton;
