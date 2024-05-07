import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@abhishekjaglan/medium-common";

export const userRoute = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRoute.post('/signup', async(c) => {

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

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

      const user = await prisma.user.findUnique({
        where:{
          email: body.email
        }
      });

      if(user){
        c.status(403);
        return c.json({
          message: "User with email id already exists, check credentials"
        });
      }
  
      const response = await prisma.user.create({
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
        }, 
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        }
      });
  
      const jwt_token = await sign({
        id: response.id,
        email: response.email
      }, c.env.JWT_SECRET);
  
      return c.json({
        token: jwt_token,
        message:"Signed Up!"
      });
      
    } catch (error) {
      c.status(411)
      return c.json({
        message: "Invalid Input, check credentials, user probably already exists"
      });
    }
  });
  
  userRoute.post('/signin', async(c) => {

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if(!success){
      c.status(411)
      return c.json({
        message: "Invalid Inputs"
      });
    }
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
  
      const user = await prisma.user.findFirst({
        where:{
          email: body.email,
          password: body.password,
        },
        select:{
          email: true,
          id: true,
          firstName: true,
          lastName: true,
        }
      });
  
      if(!user){ 
        c.status(403);
        return c.json({
          message: "Incorrect password or email"
        });
      }
  
      const jwt_token = await sign({
          email: user.email ,
          id: user.id
      }, c.env.JWT_SECRET);

      console.log(body);
      console.log(jwt_token);
  
      return c.json({
        token: jwt_token,
        message: "Signed In!"
    });
      
    } catch (error) {
      c.status(411);
      return c.json({
        message: "Incorrect password or email"
      });
    }
  });