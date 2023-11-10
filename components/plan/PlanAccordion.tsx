import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

function PlanAccordion() {
  return (
    <div className="row">
      <div className="container">
        <div className="faq__container">
          <Accordion className="accordion__card">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="accordion__header"
            >
              <Typography className="accordion__title">
                How does the free 7-day trial work?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion__collapse">
              <Typography>
                Begin your complimentary 7-day trial with a Summarist annual
                membership. You are under no obligation to continue your
                subscription, and you will only be billed when the trial period
                expires. With Premium access, you can learn at your own pace and
                as frequently as you desire, and you may terminate your
                subscription prior to the conclusion of the 7-day free trial.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion__card">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              className="accordion__header"
            >
              <Typography className="accordion__title">
                Can I switch subscriptions from monthly to yearly, or yearly to
                monthly?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion__collapse">
              <Typography>
                While an annual plan is active, it is not feasible to switch to
                a monthly plan. However, once the current month ends,
                transitioning from a monthly plan to an annual plan is an
                option.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion__card">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
              className="accordion__header"
            >
              <Typography className="accordion__title">
                {" What's included in the Premium plan?"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion__collapse">
              <Typography>
                Premium membership provides you with the ultimate Summarist
                experience, including unrestricted entry to many best-selling
                books high-quality audio, the ability to download titles for
                offline reading, and the option to send your reads to your
                Kindle.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="accordion__card">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
              className="accordion__header"
            >
              <Typography className="accordion__title">
                Can I cancel during my trial or subscription?
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion__collapse">
              <Typography>
                You will not be charged if you cancel your trial before its
                conclusion. While you will not have complete access to the
                entire Summarist library, you can still expand your knowledge
                with one curated book per day.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default PlanAccordion;
