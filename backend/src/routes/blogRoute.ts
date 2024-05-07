import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@abhishekjaglan/medium-common";

export const blogRoute = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables:{
        userId: string,
    }
}>();

// blogRoute.use('/*', async (c, next) => { 
//     const jwt = c.req.header('Authorization');
// 	if (!jwt) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	const token = jwt.split(' ')[1];
// 	const payload = await verify(token, c.env.JWT_SECRET);
// 	if (!payload) {
// 		c.status(401);
// 		return c.json({ error: "unauthorized" });
// 	}
// 	c.set('userId', payload.id);
// 	await next();
//   });

  blogRoute.use('/*', async(c, next)=>{
    const token = c.req.header('Authorization') || "";
    console.log("Token:   ",token);

    if (!token) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

    try {
        
        const decodedPayload = await verify(token, c.env.JWT_SECRET);   
        console.log("Payload:  ", decodedPayload);

        if(decodedPayload){
            c.set('userId', decodedPayload.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "Your are not signed in"
            });
        }

    } catch (error) {
        c.status(403);
        return c.json({
            messagge: "You are not logged in"
        })
    }
    
});


blogRoute.post('/', async(c) => {

    const body = await c.req.json();
    const userId = c.get('userId');
    const { success } = createBlogInput.safeParse(body);

    if(!success){
        c.status(411)
        return c.json({
            message: "Invalid Input/s"
        });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    console.log("Body:   ", body);

    try {

        const response = await prisma.blog.create({
            data:{
                title: body.title,
                body: body.body,
                authorId: userId,
            },
            select:{
                id:true,
            }
        });

        console.log("response:  ",response);

        c.status(200);
        return c.json({
            response,
            message: "Blog post created successfully"
        })
        
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Invalid Input"
        });
    }
});
 
// add pagination
blogRoute.get('/bulk', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        
        const blogs = await prisma.blog.findMany({
            select:{
                id: true,
                title: true,
                body: true,
                createdAt:true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });

        console.log(blogs);

        c.status(200);
        return c.json({
            blogs
        });

    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({
            message: "Invalid Input"
        });
    }
});
  
blogRoute.get('/:id', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {

        const blog = await prisma.blog.findUnique({
            where:{
                id: id
            },
            select:{
                id: true,
                title: true,
                body: true,
                createdAt:true,
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });

        console.log(blog);

        c.status(200);
        return c.json({
            blog
        })
        
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({
            message: "Error while fetching blog"
        });
    }
});
  
blogRoute.put('/', async(c) => {

    const body = await c.req.json();
    const userId = c.get("userId");
    const { success } = updateBlogInput.safeParse(body);

    if(!success){
        c.status(411)
        return c.json({
            message: "Invalid Input/s"
        });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const response = await prisma.blog.update({
            where:{
                id: body.id,
                authorId: userId,
            },
            data:{
                title: body.title,
                body: body.body,
            },
            select:{
                title: true,
                body: true,
                author: true,
            }
        });

        console.log(response);

        c.status(200);
        return c.json({
            response,
            message: "Blog updated"
        });
        
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({
            message: "Invalid Input"
        });   
    }
});