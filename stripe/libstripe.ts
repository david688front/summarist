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

        if(subscriptions.data[0]){

            if(subscriptions.data[0].status === "active" && subscriptions.data[0].items.data[0].plan.id === "price_1OCa1YL3S5nVxXEOQNXVKAuL"){
                return "yearly";
            }else if(subscriptions.data[0].status === "active" && subscriptions.data[0].items.data[0].plan.id === "price_1OCa2oL3S5nVxXEO2LmrpEaU"){
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

    if(priceId === "price_1OCa1YL3S5nVxXEOQNXVKAuL"){

        const checkout = await stripe.checkout.sessions.create({
            success_url: "https://internshipsummarist.vercel.app/settings",
            cancel_url: "https://internshipsummarist.vercel.app/choose-plan",
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

    }else if(priceId === "price_1OCa2oL3S5nVxXEO2LmrpEaU"){

        const checkout = await stripe.checkout.sessions.create({
            success_url: "https://internshipsummarist.vercel.app/settings",
            cancel_url: "https://internshipsummarist.vercel.app/choose-plan",
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