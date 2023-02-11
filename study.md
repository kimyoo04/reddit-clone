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
