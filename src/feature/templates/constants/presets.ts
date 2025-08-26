export const schemaPresets = {
  // Basic User Schema
  user: {
    id: "id",
    name: "fullname",
    email: "email",
    username: "username",
    age: "age",
    phone: "phone",
    address: {
      street: "address",
      city: "city",
      state: "state",
      country: "country",
      zipcode: "zipcode",
    },
    avatar: "avatar",
    bio: "bio",
  },

  // Blog Post Schema
  blogPost: {
    id: "id",
    title: "sentence",
    slug: "word",
    author: {
      id: "id",
      name: "fullname",
      email: "email",
      avatar: "avatar",
    },
    content: "paragraph",
    createdAt: "date",
  },

  // E-commerce Product Schema
  ecommerce: {
    id: "id",
    name: "productname",
    description: "description",
    price: "price",
    category: "department",
    image: "image",
    sku: "uuid",
    inStock: "boolean",
  },

  // Social Media Post Schema
  socialPost: {
    id: "id",
    user: {
      id: "id",
      username: "username",
      avatar: "avatar",
    },
    content: "sentence",
  
    likes: "number",
    
    createdAt: "date",
  },

  // Analytics Event Schema
  analytics: {
    eventId: "uuid",
    eventName: "word",
    userId: "id",
    timestamp: "date",
    properties: {
      page: "url",
      referrer: "url",
      browser: "word",
      device: "word",
      location: {
        city: "city",
        country: "country",
      },
    },
  },
} as const;

export type SchemaPresetType = keyof typeof schemaPresets;
