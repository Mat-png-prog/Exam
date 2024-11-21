###### Install all node modules in packe.json

#### using npm i or npm i -legacy-peer-deps(release-candidate)

add "type" : "modules" to package.json -before scripts

##### add Nextconfig.mjs(typescript)

##### Setup prettier by adding prettier to eslintric.json

Remove next/typescript

#### And creating prettier.config .js -add

module.exports = {
plugins: ["prettier-plugin-tailwindcss"]
}

##### Set up Prisma and Database

1 npx prisma db init - create prisma file and schema
2 Go to vercel for your env credentials
3 Add env file and paste credentials
4 Add credtentials to schema.prisma

##### Set up models using fields.md

1 Create models and push to database useing npx prisma db push
2 When you wnt to see database use npx prisma studio

##### Set up Lucia And Session model that connects to user model:

###### Set up the Sigin and Login Functionality.(No user roles is required):

#### npx shadcn@latest init

### npx shadcn@latest add button dropdown-menu form input label table textarea2 --legacy-peer-deps

### npm i react@latest react-dom@latest @floating-ui/react-dom@latest @radix-ui/react-popper@latest react-hook-form@latest  --legacy-peer-deps
