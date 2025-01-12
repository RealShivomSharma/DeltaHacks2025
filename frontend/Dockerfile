# 1) Use an official Node 18 Alpine image as the base
FROM node:18-alpine

# 2) Set the container's working directory to /app
WORKDIR /app

# 3) Copy package.json (and optionally package-lock.json) into /app
COPY package.json ./

# 4) Install dependencies (this is where Tailwind, React, etc. all get installed)
RUN npm install

# 5) Copy all remaining files from your local frontend folder into the container
COPY . .

# 6) Expose port 3000 (Next.js default dev port)
EXPOSE 3000

# 7) Run the "dev" script from package.json (which calls `next dev`)
CMD ["npm", "run", "dev"]

