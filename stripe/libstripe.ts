import Stripe from 'stripe';
export const stripe = new Stripe(
    String(process.env.NEXT_PUBLIC_STRIPE_SECRET),
    {
      apiVersion: '2023-10-16',
    }
);
  
export async function getStripeCusId(email: string) {

    if (email) {
        const customer = await stripe.customers.list({
            email: email
        })

        if(customer.data.length === 0){
            const customer = await stripe.customers.create({
                email: String(email)
            })
            return customer.id
        }else{
            //console.log(customer.data)
            return customer.data[0].id;
        }
    }
    return false;
}


export async function hasSubscription(customer: string) {
    if (customer) {

       try {

        const subscriptions = await stripe.subscriptions.list({
            customer: String(customer)
        })

        //console.log(subscriptions.data)

        if(subscriptions.data[0]){

            if( (subscriptions.data[0].status === "active" || subscriptions.data[0].status === "trialing" )  && subscriptions.data[0].items.data[0].plan.id === process.env.NEXT_PUBLIC_YEARLY_PLAN){
                return "yearly";
            }else if( (subscriptions.data[0].status === "active" || subscriptions.data[0].status === "trialing")  && subscriptions.data[0].items.data[0].plan.id === process.env.NEXT_PUBLIC_MONTHLY_PLAN){
                return "monthly";
            }else{
                return "no";
            }

        }else{
            return "no";
        }

       }catch (error) {
         return "no";
       }
    }
}


export async function createCheckoutLink(priceId: string,cusId: string) {

    if(priceId === process.env.NEXT_PUBLIC_YEARLY_PLAN){

        const checkout = await stripe.checkout.sessions.create({
            //success_url: `${window.location.origin}/settings`,
            //cancel_url: `${window.location.origin}/choose-plan`,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/choose-plan`,
            customer: cusId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: "subscription",
            subscription_data: {
                metadata: {
                    //payingUserId: user.uid,
                },
                trial_period_days: 7,
            },
        })
        return checkout.url;

    }else if(priceId === process.env.NEXT_PUBLIC_MONTHLY_PLAN){

        const checkout = await stripe.checkout.sessions.create({
            //success_url: `${window.location.origin}/settings`,
            //cancel_url: `${window.location.origin}/choose-plan`,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/choose-plan`,
            customer: cusId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: "subscription",
        })
        return checkout.url;
        
    }
}