# 초기 세팅

cd client
npx create-next-app@latest --typescript ./

cd server
npm init
npm i morgan nodemon express --save
npm i typescript ts-node @types/node @types/express @types/morgan --save-dev
npx tsc --init

package.json 설정
"start": "ts-node src/index.ts",
"dev": "nodemon --exec ts-node src/server.ts",

gitignore 생성 및 설정

docker-compose.yml 파일 생성 및 작성
docker-compose up && docker-compose down

install pg typeorm reflect-metadata --save
npx typeorm init
data-source.ts 에서 entities, username, password, database 설정
server.ts 에서 AppDataSource.initialize() 하고 console.log 찍기

ts-config 변경된 것 돌려놓기

# Entity 생성하기

npm install bcryptjs class-validator class-transformer --save
npm i @types/bcryptjs --save-dev

#### Base Entity 생성

- @PrimaryGeneratedColumn()
- @CreateDateColumn()
- @UpdateDateColumn()

#### tsconfig.json 수정 (설정에 따라 오류 표시됨)

- "strictPropertyInitialization": false /_ Check for class properties that are declared but not set in the constructor. _/,
- "experimentalDecorators": true, /_ Enable experimental support for TC39 stage 2 draft decorators. _/
