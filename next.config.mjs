/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/websev/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:1234/websev/:path*"
            : "/websev/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:1234/docs"
            : "/websev/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:1234/openapi.json"
            : "/websev/openapi.json",
      },
    ];
  },
};

export default nextConfig;