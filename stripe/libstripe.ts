//import { authOptions } from '@/pages/api/auth/[...nextauth]';
//import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
//import { PrismaClient } from "@prisma/client";
import { randomUUID } from 'crypto';
//const prisma = new PrismaClient();
//price_1NarR3APMZcBliJSoefCKTi5

import app, { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import {collection,setDoc,doc,deleteDoc,onSnapshot,DocumentData, addDoc} from "@firebase/firestore";
import { useState } from 'react';


export const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
    apiVersion: '2023-10-16',
});



export async function getStripeCusId(email: string) {

    //const session = await getServerSession(authOptions);
    if (email) {
        //const user = await prisma.user.findFirst({ where: { email: session.user?.email } });
        // find cus_id first
        //stripe.Customer.list(email="Test@example.com")

        const customer = await stripe.customers.list({
            email: email
        })
        //return subscriptions.data.length > 0;

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

    //const session = await getServerSession(authOptions);
    if (customer) {
        //const user = await prisma.user.findFirst({ where: { email: session.user?.email } });
        // find cus_id first

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
            success_url: "https://internshipsummarist.vercel.app/for-you",
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
            success_url: "https://internshipsummarist.vercel.app/for-you",
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



export async function createCustomerIfNull(userId: string) {
    /*
    await setDoc(
        doc(db, "customers", user!.uid, "myList", book?.id.toString()),
        {
          ...book,
        }
      );
        */ //  {status: "OK"}
      
        // const docRef = await setDoc(
        //     doc(db, "customers", userId, "subscribe", "asdEE"),
        //     { status: "ok" }
        //   );

        // const docRef = await addDoc(collection(db, "customers", userId, "subscribe"),
        // { 
        //     stripe_customer_id: "ok" 
        // }
        // );
     
}

// export async function createCustomerIfNull() {
//     const session = await getServerSession(authOptions);
//     if (session) {
//         const user = await prisma.user.findFirst({ where: { email: session.user?.email } });
//         if (!user?.api_key) {
//             await prisma.user.update({
//                 where: {
//                     id: user?.id
//                 },
//                 data: {
//                     api_key: "secret_" + randomUUID()
//                 }
//             })
//         }

//         if (!user?.stripe_customer_id) {
//             const customer = await stripe.customers.create({
//                 email: String(user?.email)
//             })
//             await prisma.user.update({
//                 where: {
//                     id: user?.id
//                 },
//                 data: {
//                     stripe_customer_id: customer.id
//                 }
//             })
//         }
//         const user2 = await prisma.user.findFirst({ where: { email: session.user?.email } });
//         return user2?.stripe_customer_id;

//     }
// }