import { prisma } from "@/lib/prisma";
import { CreateOrderInput, UpdateOrderStatusInput } from "@/lib/validations";

export class OrderService {
  static async createOrder(userId: string, data: CreateOrderInput) {
    // Start a transaction to ensure data consistency
    return prisma.$transaction(async (tx: any) => {
      let total = 0;
      const orderItems = [];

      // Validate products and calculate total
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        total += product.price * item.quantity;
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // Create the order
      const order = await tx.order.create({
        data: {
          userId,
          total,
          orderItems: {
            create: orderItems,
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update product quantities
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });
  }

  static async getUserOrders(
    userId: string,
    options: { page?: number; limit?: number } = {},
  ) {
    const { page = 1, limit = 10 } = options;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.order.count({ where: { userId } }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getOrderById(orderId: string, userId?: string) {
    const where: any = { id: orderId };
    if (userId) {
      where.userId = userId; // Regular users can only see their own orders
    }

    return prisma.order.findFirst({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              include: {
                producer: {
                  include: {
                    user: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  static async getProducerOrders(
    producerId: string,
    options: { page?: number; limit?: number } = {},
  ) {
    const { page = 1, limit = 10 } = options;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: {
          orderItems: {
            some: {
              product: {
                producerId,
              },
            },
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.order.count({
        where: {
          orderItems: {
            some: {
              product: {
                producerId,
              },
            },
          },
        },
      }),
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async updateOrderStatus(
    orderId: string,
    producerId: string,
    data: UpdateOrderStatusInput,
  ) {
    // Verify the producer has products in this order
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        orderItems: {
          some: {
            product: {
              producerId,
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found or access denied");
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status: data.status },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  static async getOrderStats(producerId?: string) {
    const baseWhere = producerId
      ? {
          orderItems: {
            some: {
              product: {
                producerId,
              },
            },
          },
        }
      : {};

    const [totalOrders, totalRevenue, pendingOrders] = await Promise.all([
      prisma.order.count({ where: baseWhere }),
      prisma.order.aggregate({
        where: baseWhere,
        _sum: {
          total: true,
        },
      }),
      prisma.order.count({
        where: {
          ...baseWhere,
          status: "PENDING",
        },
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      pendingOrders,
    };
  }
}
