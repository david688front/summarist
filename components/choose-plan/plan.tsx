import useAuth from "@/hooks/useAuth";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { createCheckoutLink,hasSubscription,getStripeCusId} from "@/stripe/libstripe";

function PlanContent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activePlan, setActivePlan] = useState<string>("yearly");
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
  const handleActivePlan = (planName: string) => {
    setActivePlan(planName);
    setSelectedPlan(planName);
  };

  const router = useRouter();
  const handleCheckout = async () => {

    if (!user) return;
    setLoading(true);
    const priceId =
      selectedPlan === "yearly"
        ? process.env.NEXT_PUBLIC_YEARLY_PLAN
        : process.env.NEXT_PUBLIC_MONTHLY_PLAN;

    const cus_id = await getStripeCusId(String(user.email));
    console.log(cus_id)
    // has subscription
    const hasSub = await hasSubscription(String(cus_id));
    //console.log(hasSub)

    if(hasSub === "yearly"){
      return router.push('/for-you');
    }else if(hasSub === "monthly"){
      return router.push('/for-you');
    }
    const checkoutLink = await createCheckoutLink(String(priceId),String(cus_id));
    router.push(String(checkoutLink))

    
  };


  return (
    <div className="row">
      <div className="container">
        <div className="plan__features--wrapper">
          <div className="plan__features">
            <figure className="plan__features--icon">
              <IoDocumentTextSharp />
            </figure>
            <div className="plan__features--text">
              <b>Key ideas in few min </b>
              with many books to read
            </div>
          </div>
          <div className="plan__features">
            <figure className="plan__features--icon">
              <RiPlantFill />
            </figure>
            <div className="plan__features--text">
              <b>3 million </b>
              people growing with Summarist everyday
            </div>
          </div>
          <div className="plan__features">
            <figure className="plan__features--icon">
              <FaHandshake />
            </figure>
            <div className="plan__features--text">
              <b>Precise recommendations </b>
              collections curated by experts
            </div>
          </div>
        </div>

        <div className="section__title">Choose the plan that fits you</div>

        {["yearly", "monthly"].map((plan) => (
          <>
            <div
            key={plan}
              className={`plan__card ${
                activePlan === plan ? "plan__card--active" : ""
              }`}
              onClick={() => handleActivePlan(plan)}
            >
              <div className="plan__card--circle">
                <div
                  className={`${activePlan === plan ? "plan__card--dot" : ""}`}
                ></div>
              </div>
              <div className="plan__card--content">
                <div className="plan__card--title">
                  {plan === "yearly" ? "Premium Plus Year" : "Premium Monthly"}
                </div>
                <div className="plan__card--price">
                  {plan === "yearly" ? "$99.99/year" : "$9.99/month"}
                </div>
                <div className="plan__card--text">
                  {plan === "yearly"
                    ? "7-day free trial included"
                    : "No trial included"}
                </div>
              </div>
            </div>
            <div className="plan__card--separator">
              <span className="plan__separator">or</span>
            </div>
          </>
        ))}

        <div className="plan__card--cta">
          {activePlan === "yearly" ? (
            <>
              <span className="btn--wrapper">
                <button className="btn" style={{width:'300px'}} onClick={handleCheckout}>
                  {loading ? (
                    <AiOutlineLoading3Quarters className="loading__icon" />
                  ) : (
                    <span>Start your free 7-day trial</span>
                  )}
                </button>
              </span>
              <div className="plan__disclaimer">
                {
                  "Cancel your trial at any time before it ends, and you won’t be charged."
                }
              </div>
            </>
          ) : (
            <>
              <span className="btn--wrapper">
                <button className="btn" style={{width:'300px'}} onClick={handleCheckout}>
                  {loading ? (
                    <AiOutlineLoading3Quarters className="loading__icon" />
                  ) : (
                    <span>Start your first month</span>
                  )}
                </button>
              </span>
              <div className="plan__disclaimer">
                30-day money back guarantee, no questions asked.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanContent;
