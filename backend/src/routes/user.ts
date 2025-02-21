import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'
import {sign ,verify} from 'hono/jwt'
import { signinInput, signupInput } from "@codingprism/medium";


export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET:  string;
      }
}>();



userRouter.post('/signup', async(c) => {
    const body =await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(422);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const user=await prisma.user.create({
        data:{
            email: body.email,
            password: body.password,
            name : body.name
            }  
      })
      const jwt=await sign({
      id: user.id,
      name:user.name,
    },c.env.JWT_SECRET);
     c.status(200);
    return c.text(jwt)
    } catch (error) {
      c.status(411);
      return c.text('Invalid')
    }
  })
  
  
  
  userRouter.post('/signin', async(c) => {
    const body =await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(422);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const user=await prisma.user.findFirst({
        where:{
          email: body.email,
          password: body.password,
        }
    })
    if(!user){
      c.status(401);
      return c.text('Incorrect creds')
    }
    const jwt=await sign({
      id: user.id,
      name:user.name,
    },c.env.JWT_SECRET);
     c.status(200);
    return c.text(jwt)
    } catch (error) {
      c.status(411);
      return c.text('Invalid')
    }
  })
  