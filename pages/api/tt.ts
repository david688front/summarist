// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  name1: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  res.status(200).json(
    { 
        name: String(process.env.STRIPE_SECRET_KEY),
        name1: String(process.env.NEXT_STRIPE_SECRET_KEY)
    })

}
