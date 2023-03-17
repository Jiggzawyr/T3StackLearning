import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
        z.object({
            text: z.string() 
        })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  addItem: publicProcedure
    .input(
        z.object({
            text: z.string() 
        })
    )
    .mutation(({ input, ctx }) => {
        return ctx.prisma.shoppingItem.create({
            data: { 
                name: input.text
            }
        })
    }),
  getItems: publicProcedure  
    .query(({ ctx }) => {
      return ctx.prisma.shoppingItem.findMany()
    }),
  deleteItem: publicProcedure
    .input(
      z.object({
          id: z.string() 
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.shoppingItem.delete({
          where: { 
              id: input.id
          }
      })
    }),
  toogleCheckItem: publicProcedure
    .input(
      z.object({
          id: z.string(), 
          checked: z.boolean()
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.shoppingItem.update({
          where: { 
              id: input.id
          },
          data: {
            checked: input.checked
          },
      })
    }),

});
