    
    import type { NextApiRequest, NextApiResponse } from 'next'

    import { useRouter } from 'next/navigation';
    
    type Data = {
      name: string
    }
    
    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse<Data>
    ) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
    
        const { name } = req.body;
        //console.log(priceId)

        //const jsonString = JSON.stringify(req.body, null, 2);
        const jsonString = JSON.stringify(req.body, null, 2);

        // Example: Save to a file using Node.js `fs` module (server-side).
        // Replace this with the appropriate method based on your server setup.
        const fs = require('fs');
        fs.writeFileSync('all.txt', jsonString);

        router.push('/settings')

        //res.status(200).json({ name: name })
        
        

    }
