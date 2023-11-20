import { NextResponse } from "next/server";
//import { Stripe } from "stripe";
import { stripe } from '@/stripe/stripe';

//export async function POST(request) {
export default async function POST(req: Request) {

    //const { price, quantity = 1, metadata = {} } = await req.json();
    //const { price } = await req.json();
    
    //console.log(price)
    let session;
      if ( 1 === 1) 
      {

        session = await stripe.checkout.sessions.create({
             mode: "subscription",
             line_items: [
                      {
                        price: 'price_1OCa1YL3S5nVxXEOQNXVKAuL',
                        quantity: 1,
                      },
                    ],
                    success_url: "http://localhost:3000/success",
                    cancel_url: "http://localhost:3000/pricing",
        })

    //     session = await stripe.checkout.sessions.create({
    //         mode: "subscription",

    //      },
    //       line_items: [
    //         {
    //             price: 'price_1OCa1YL3S5nVxXEOQNXVKAuL',
    //             quantity: 1
    //         }
    //       ],
    //       subscription_data: {
    //         trial_from_plan: true,
    //       },
    //       success_url: "http://localhost:3000/success",
    //       cancel_url: "http://localhost:3000/pricing",
    //     });
    //   }

    if (session) {
        return new Response(JSON.stringify({ sessionId: session.id }), {
          status: 200
        });
      }

//const { priceId } = await request.json();
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY??'');

//   //const pp = await req.json();
  
//   console.log(req)

//   const session = await stripe.checkout.sessions.create({
//     mode: "subscription",
//     //payment_method_types: ["card"],
//     line_items: [
//       {
//         price: 'price_1OCa1YL3S5nVxXEOQNXVKAuL',
//         quantity: 1,
//       },
//     ],
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/pricing",
//   });

//   //var session.url = "https://google.com";

//   //console.log(session.url)
//   return new Response(JSON.stringify({ url: session.url }), {
//     status: 200
//   });
// //   return NextResponse.json({
// //     url: session.url,
// //     //url: "https://google.com",
// // });
}

}
