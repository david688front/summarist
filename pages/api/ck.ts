// pages/api/create.js

//export default async function handler(req: { method: string; body: { data: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
//export default async function POST(req: Request) {
import { stripe } from '@/stripe/stripe';
import useAuth from '@/hooks/useAuth';

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  sessionId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth();
    
    const { priceId } = req.body;
    //console.log(priceId)

    let session;
    // yearly  
    if ( priceId === "price_1OCa1YL3S5nVxXEOQNXVKAuL" ) {
        session = await stripe.checkout.sessions.create({
             mode: "subscription",
             line_items: [
                      {
                        price: priceId,
                        quantity: 1,
                      },
            ],
            success_url: "http://localhost:3000/settings",
            cancel_url: "http://localhost:3000/settings",
            subscription_data: {
                metadata: {
                    payingUserId: user ? user.uid : null,
                },
                trial_period_days: 7,
            },        
        })
    }else if(priceId === "price_1OCa2oL3S5nVxXEO2LmrpEaU"){
        session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                     {
                       price: priceId,
                       quantity: 1,
                     },
           ],
           success_url: "http://localhost:3000/settings",
           cancel_url: "http://localhost:3000/settings",        
       })
    }


    if(session){
        res.status(200).json({ sessionId: session.id })
    }

}
    //const { price, quantity = 1, metadata = {} } = await req.json();

      // Perform actions with the data (e.g., save it to a database)

      //res.status(200).json({ message: req.method });



    //   return new Response(JSON.stringify({ sessionId: '1152'}), {
    //     status: 200
    //   });
  