import { prisma } from "@/lib/prisma";
import {
  UserInput,
  ProducerProfileInput,
  ProductInput,
  UpdateProductInput,
} from "@/lib/validations";
// import bcrypt from "bcryptjs";

import bcrypt from "bcrypt";

export class UserService {
  static async createUser(data: UserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        producerProfile: true,
      },
    });
  }

  static async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        producerProfile: true,
        orders: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  static async updateUser(id: string, data: Partial<UserInput>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    return prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export class ProducerService {
  static async createOrUpdateProfile(
    userId: string,
    data: ProducerProfileInput,
  ) {
    return prisma.producerProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  }

  static async getProfile(userId: string) {
    return prisma.producerProfile.findUnique({
      where: { userId },
      include: {
        products: {
          orderBy: {
            createdAt: "desc",
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
}

export class ProductService {
  static async createProduct(producerId: string, data: ProductInput) {
    return prisma.product.create({
      data: {
        ...data,
        producerId,
      },
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
    });
  }

  static async getAllProducts(
    options: {
      page?: number;
      limit?: number;
      category?: string;
      search?: string;
      producerId?: string;
    } = {},
  ) {
    const { page = 1, limit = 12, category, search, producerId } = options;

    const where: any = {
      quantity: {
        gt: 0, // Only show products with available stock
      },
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (producerId) {
      where.producerId = producerId;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
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
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        producer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  static async updateProduct(
    id: string,
    producerId: string,
    data: UpdateProductInput,
  ) {
    // Verify the product belongs to the producer
    const product = await prisma.product.findFirst({
      where: {
        id,
        producerId,
      },
    });

    if (!product) {
      throw new Error("Product not found or access denied");
    }

    return prisma.product.update({
      where: { id },
      data,
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
    });
  }

  static async deleteProduct(id: string, producerId: string) {
    // Verify the product belongs to the producer
    const product = await prisma.product.findFirst({
      where: {
        id,
        producerId,
      },
    });

    if (!product) {
      throw new Error("Product not found or access denied");
    }

    return prisma.product.delete({
      where: { id },
    });
  }
}
