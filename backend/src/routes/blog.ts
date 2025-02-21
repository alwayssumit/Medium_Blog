
import { createBlogInput, updateBlogInput } from "@codingprism/medium";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL: string;
        JWT_SECRET:  string;
    }
}>();

 blogRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header("authorization") || "";
    try {
        const user=await verify(authHeader,c.env.JWT_SECRET)
       if(user){
        //@ts-ignore
          c.set("userId",user.id);
           await next();
       }else{
          c.status(403);
           return c.json({
               message:"you are not Logged in"
         })
       }
    } catch (error) {
        c.status(403);
           return c.json({
               message:"you are not Logged in"
         })
    }
 }); 

blogRouter.post('/', async(c) => {
    const body =await c.req.json();
    //@ts-ignore
    const authorId = c.get("userId");
    const {success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId:Number(authorId),
         }
    })
    c.status(200);
    return c.json({
        id:blog.id
    })
  })



blogRouter.put('/', async(c) => {
    const body =await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.update({
        where:{
            id:body.id
        }, 
        data:{
            title: body.title,
            content: body.content,
            createdAt: new Date(),
            }
    })
    return c.json({
        id:blog.id
    })
  })
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
      const blogs=await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            createdAt:true,
            author:{
                select:{
                    name:true
                }
            }
        }
      });

    return c.json({
        blogs
    })
  })
  
blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog=await prisma.blog.findFirst({
            where:{
                id:Number(id)
            }, 
            select:{
                id:true,
                title:true,
                content: true,
                createdAt:true,
                author:{
                    select:{
                        name:true
                    }
                }

            }
        })
        return c.json({
            blog 
        });
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error while Fetching blog post"
        });
    }
  })

  

  