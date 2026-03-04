import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, testConnection, initializeDatabase } from "./database.js";

dotenv.config();

const fastify = Fastify({
  logger: process.env.NODE_ENV === "development",
});

// Register CORS to allow frontend (Next.js) to communicate with this API
fastify.register(cors, {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

const authenticate = async (request, reply) => {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return reply.code(401).send({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.findOne("Users", { id: decoded.userId });

    if (!user) {
      return reply.code(401).send({ error: "User not found" });
    }

    request.user = user;
  } catch {
    return reply.code(401).send({ error: "Invalid token" });
  }
};

fastify.get("/health", async () => {
  const dbStatus = (await testConnection()) ? "connected" : "disconnected";
  return {
    status: "OK",
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: "1.0.0",
    endpoints: [
      "/auth/register",
      "/auth/login",
      "/heroFooter",
      "/services",
      "/portfolio",
      "/blogs",
      "/testimonials",
      "/teams",
      "/contacts",
      "/partners",
    ],
  };
});

fastify.post("/auth/register", async (request, reply) => {
  try {
    const { username, password } = request.body;

    const existingUser = await db.findOne("Users", { username });
    if (existingUser) {
      return reply.code(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.insert("Users", {
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      token,
      user: { id: user.id, username: user.username },
    };
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post("/auth/login", async (request, reply) => {
  try {
    const { username, password } = request.body;

    const user = await db.findOne("Users", { username });
    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      token,
      user: { id: user.id, username: user.username },
    };
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.get("/heroFooter", async (request, reply) => {
  try {
    const heroFooters = await db.findAll("HeroFooter", {}, "name ASC");
    return heroFooters;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.patch(
  "/heroFooter/:name",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { name } = request.params;
      const { amount } = request.body;

      const heroFooter = await db.findOne("HeroFooter", name);
      if (!heroFooter) {
        return reply.code(404).send({ error: "HeroFooter not found" });
      }

      const updated = await db.update("HeroFooter", name, { amount });
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.get("/services", async (request, reply) => {
  try {
    const services = await db.findAll("Services");
    return services;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post(
  "/services",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const service = await db.insert("Services", request.body);
      return service;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.put(
  "/services/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Services", id);
      if (!service) {
        return reply.code(404).send({ error: "Service not found" });
      }

      const updated = await db.update("Services", id, request.body);
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.delete(
  "/services/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Services", id);
      if (!service) {
        return reply.code(404).send({ error: "Service not found" });
      }

      await db.delete("Services", id);
      return { message: "Service deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.get("/portfolio", async (request, reply) => {
  try {
    const portfolio = await db.findAll("Portfolio");
    return portfolio;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post(
  "/portfolio",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const portfolio = await db.insert("Portfolio", request.body);
      return portfolio;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.put(
  "/portfolio/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Portfolio", id);
      if (!service) {
        return reply.code(404).send({ error: "PortFolio not found" });
      }

      const updated = await db.update("Portfolio", id, request.body);
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.delete(
  "/portfolio/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Portfolio", id);
      if (!service) {
        return reply.code(404).send({ error: "Portfolio not found" });
      }

      await db.delete("Portfolio", id);
      return { message: "PortFolio deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

// ==================== BLOGS ====================
fastify.get("/blogs", async (request, reply) => {
  try {
    const blogs = await db.findAll("Blogs", {}, "date DESC");
    return blogs;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post(
  "/blogs",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const blog = await db.insert("Blogs", {
        ...request.body,
        date: new Date(request.body.date),
      });
      return blog;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.put(
  "/blogs/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Blogs", id);
      if (!service) {
        return reply.code(404).send({ error: "Blog not found" });
      }

      const updated = await db.update("Blogs", id, {
        ...request.body,
        date: new Date(request.body.date),
      });
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.delete(
  "/blogs/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Blogs", id);
      if (!service) {
        return reply.code(404).send({ error: "Blog not found" });
      }

      await db.delete("Blogs", id);
      return { message: "Blog deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

// ==================== TESTIMONIALS ====================
fastify.get("/testimonials", async (request, reply) => {
  try {
    const testimonials = await db.findAll(
      "Testimonials",
      {},
      "created_at DESC",
    );
    return testimonials;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post(
  "/testimonials",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const testimonial = await db.insert("Testimonials", request.body);
      return testimonial;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.put(
  "/testimonials/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Testimonials", id);
      if (!service) {
        return reply.code(404).send({ error: "Testimonial not found" });
      }

      const updated = await db.update("Testimonials", id, request.body);
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.delete(
  "/testimonials/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Testimonials", id);
      if (!service) {
        return reply.code(404).send({ error: "Testimonial not found" });
      }

      await db.delete("Testimonials", id);
      return { message: "Testimonial deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

// ==================== TEAMS ====================
fastify.get("/teams", async (request, reply) => {
  try {
    const teams = await db.findAll("Teams", {}, "name ASC");
    return teams;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post(
  "/teams",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const team = await db.insert("Teams", request.body);
      return team;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.put(
  "/teams/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Teams", id);
      if (!service) {
        return reply.code(404).send({ error: "Team not found" });
      }

      const updated = await db.update("Teams", id, request.body);
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.delete(
  "/teams/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Teams", id);
      if (!service) {
        return reply.code(404).send({ error: "Team not found" });
      }

      await db.delete("Teams", id);
      return { message: "Team deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

// ==================== CONTACTS ====================
fastify.post("/contacts", async (request, reply) => {
  try {
    const contact = await db.insert("Contacts", request.body);
    return {
      message: "Contact message sent successfully",
      contact,
    };
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.get("/contacts", async (request, reply) => {
  try {
    const contacts = await db.findAll("Contacts", {}, "created_at DESC");
    return contacts;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.delete(
  "/contacts/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const contact = await db.findById("Contacts", id);
      if (!contact) {
        return reply.code(404).send({ error: "Contact not found" });
      }

      await db.delete("Contacts", id);
      return { message: "Contact deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

// ==================== PARTNERS ====================
fastify.get("/partners", async (request, reply) => {
  try {
    const partners = await db.findAll("Partner");
    return partners;
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Internal server error" });
  }
});

fastify.post(
  "/partners",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const partner = await db.insert("Partner", request.body);
      return partner;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.put(
  "/partners/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Partner", id);
      if (!service) {
        return reply.code(404).send({ error: "Partner not found" });
      }

      const updated = await db.update("Partner", id, request.body);
      return updated;
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

fastify.delete(
  "/partners/:id",
  {
    preHandler: [authenticate],
  },
  async (request, reply) => {
    try {
      const { id } = request.params;

      const service = await db.findById("Partner", id);
      if (!service) {
        return reply.code(404).send({ error: "Partner not found" });
      }

      await db.delete("Partner", id);
      return { message: "Partner deleted successfully" };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: "Internal server error" });
    }
  },
);

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  if (error.statusCode) {
    reply.code(error.statusCode).send({ error: error.message });
  } else if (error.code === "ER_DUP_ENTRY") {
    reply.code(409).send({ error: "Duplicate entry" });
  } else {
    reply.code(500).send({ error: "Internal Server Error" });
  }
});

// Start server
const start = async () => {
  try {
    // Initialize database
    await initializeDatabase();
    console.log("✅ Database initialized successfully");

    const port = process.env.PORT || 4000;
    await fastify.listen({
      port: port,
      host: "0.0.0.0",
    });

    console.log(`\n🚀 Server is running!`);
    console.log(`📍 Local: http://localhost:${port}`);
    console.log(`📊 Health: http://localhost:${port}/health`);
    console.log(`\n🔑 Default admin credentials:`);
    console.log(`   Username: admin`);
    console.log(`   Password: admin123`);
    console.log(`\n📋 Available endpoints:`);
    console.log(`   POST   /auth/register`);
    console.log(`   POST   /auth/login`);
    console.log(`   GET    /heroFooter`);
    console.log(`   PATCH  /heroFooter/:id`);
    console.log(`   GET    /services`);
    console.log(`   POST   /services`);
    console.log(`   PUT    /services/:id`);
    console.log(`   DELETE /services/:id`);
    console.log(`   GET    /portfolio`);
    console.log(`   POST   /portfolio`);
    console.log(`   GET    /blogs`);
    console.log(`   POST   /blogs`);
    console.log(`   GET    /testimonials`);
    console.log(`   POST   /testimonials`);
    console.log(`   GET    /teams`);
    console.log(`   POST   /teams`);
    console.log(`   POST   /contacts (public)`);
    console.log(`   GET    /contacts`);
    console.log(`   DELETE /contacts/:id`);
    console.log(`   GET    /partners`);
    console.log(`   POST   /partners`);
    console.log(
      `\n🔒 Note: Most endpoints require JWT token in Authorization header`,
    );
    console.log(`   Format: Authorization: Bearer <your_token>`);
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
};

start();
