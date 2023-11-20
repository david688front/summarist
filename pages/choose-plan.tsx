import PlanAccordion from "@/components/choose-plan/accordion";
import PlanContent from "@/components/choose-plan/plan";
import PlanHeader from "@/components/choose-plan/Header";

function ChoosePlan() {
  return (
    <div className="wrapper wrapper__full">
      <div className="plan">
        <PlanHeader />
        <PlanContent />
        <PlanAccordion />
      </div>
    </div>
  );
}

export default ChoosePlan;
