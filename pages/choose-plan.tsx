import PlanAccordion from "@/components/plan/PlanAccordion";
import PlanContent from "@/components/plan/PlanContent";
import PlanHeader from "@/components/plan/PlanHeader";

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
