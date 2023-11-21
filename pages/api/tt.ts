// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Stripe from "stripe";

type Data = {
    customerss: Stripe.Customer[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const stripe = new Stripe( String(process.env.NEXT_PUBLIC_STRIPE_SECRET), {
        apiVersion: "2023-10-16",
      });

      try {
         const customers = await stripe.customers.list(); // returns all customers sorted by createdDate
          res.status(200).json({
            customerss:  customers.data,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({ customerss: []});
        }


//export default async function handler(req, res) {
// if (req.method === "POST") {
//    const { token } = JSON.parse(req.body);
// if (!token) {
//     return res.status(403).json({ msg: "Forbidden" });
//  }
//  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
//   apiVersion: "2020-08-27",
// });
// try {
//  const customers = await stripe.customers.list(); // returns all customers sorted by createdDate
//   res.status(200).json(customers);
// } catch (err) {
//   console.log(err);
//   res.status(500).json({ error: true });
// }
//  }
//}


}
