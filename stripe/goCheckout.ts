import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import { Stripe } from "stripe";
import Router from 'next/router'
import { redirect } from 'next/navigation'

//import { stripe } from '@/stripe/stripe';
import { getStripe } from '@/stripe/stripe-client';

import Stripe from 'stripe';

export const goCheckout = async (
//export async function goCheckout( {
    customerId: string,
    priceId: string
  ) => {

    let session;
    // yearly

    let stripe = new Stripe(

        process.env.STRIPE_SECRET_KEY ?? '',

        {
          apiVersion: '2023-10-16',
        }
      );
      
      if (priceId === 'price_1OCa1YL3S5nVxXEOQNXVKAuL') {

          const checkout = await stripe.checkout.sessions.create({
          success_url: "http://localhost:3000/dashboard/billing?success=true",
          cancel_url: "http://localhost:3000/dashboard/billing?success=true",
          //customer: customerId,
          line_items: [
              {
                  price: priceId,
                  quantity: 1
              }
          ],
          mode: "subscription"
      })

      //return checkout.url;

        // session = await stripe.checkout.sessions.create({
        //   payment_method_types: ['card'],
        //   billing_address_collection: 'required',
        //   customer,
        //   customer_update: {
        //     address: 'auto'
        //   },
        //   line_items: [
        //     {
        //       price: price.id,
        //       quantity
        //     }
        //   ],
        //   mode: 'subscription',
        //   allow_promotion_codes: true,
        //   subscription_data: {
        //     trial_from_plan: true,
        //     metadata
        //   },
        //   success_url: `http://localhost:3000/`,
        //   cancel_url: `http://localhost:3000/`

        // });



      } else if (priceId === 'price_1OCa2oL3S5nVxXEO2LmrpEaU') {


      }


//   const checkout = await stripe.checkout.sessions.create({
//           success_url: "http://localhost:3000/dashboard/billing?success=true",
//           cancel_url: "http://localhost:3000/dashboard/billing?success=true",
//           customer: customerId,
//           line_items: [
//               {
//                   price: priceId
//               }
//           ],
//           mode: "subscription"
//       })
    
//       return checkout.url;

  // checkout url
  };

export default goCheckout;



// export async function createCheckoutLink(customer: string) {
//   const checkout = await stripe.checkout.sessions.create({
//       success_url: "http://localhost:3000/dashboard/billing?success=true",
//       cancel_url: "http://localhost:3000/dashboard/billing?success=true",
//       customer: customer,
//       line_items: [
//           {
//               price: 'price_1NarR3APMZcBliJSoefCKTi5'
//           }
//       ],
//       mode: "subscription"
//   })

//   return checkout.url;
// }