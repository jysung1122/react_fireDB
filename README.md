# react_fireDB

- [리액트 공부](https://github.com/jysung1122/ReactStudy) 이후 진행하는 프로젝트
- FireBase를 이용하여 게시판 기능 구현

## 개발 환경 구축
1. 사용하기 쉬운 개발 환경을 제공하는 Vite 사용
   ```
   //1-1. 터미널에서 아래 코드 입력
   seongjaeyong@seongjaeyong-ui-MacBookAir Documents % npm create vite@latest

   //1-2. Project name 입력
   //1-3. Select a framework: React 선택
   //1-4. Select a variant: TypeScript + SWC 선택
   //javascript보다 typescript를 사용할 때 더 쉽고 오류도 적기 때문 + 속도가 빠른 Rust typescript 컴파일러인 SWC를 포함

   //1-5. 진행하면 폴더가 만들어 짐. 아래 코드 입력해서 vscode로 이동
   seongjaeyong@seongjaeyong-ui-MacBookAir Documents % code react-fireDB

   //1-6. vscode에서 ctrl + shift + ~ 키를 통해 터미널을 열어 아래 코드 입력
   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm install

   //1-7. 모든 것이 제대로 작동하는지 확인하기 위해 아래 코드 입력
   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm run dev
   //default : http://localhost:5173/
   ```
2. src 폴더 수정
   - App.tsx, main.tsx, vite-env.d.ts 두고 다 삭제
   - App.tsx
     ```
      function App() {
        return <></>;
      }
      
      export default App;

     ```
   - main.tsx
     ```
      import React from "react";
      import ReactDOM from "react-dom/client";
      import App from "./App.tsx";
      
      ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );

     ```
   - index.html
     ```
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>React FireDB</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>

     ```
3. git initialize (git repository 생성 후 순서대로 진행)
   ```
   (myenv) (base) seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ git init .
   Initialized empty Git repository in /Users/seongjaeyong/Documents/react-fireDB/.git/
   
   (myenv) (base) seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ git remote add origin https://github.com/jysung1122/react_fireDB
   
   (myenv) (base) seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ 
   ```
4. 아래 순서대로 설치 코드 실행
   ```
   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm i react-router-dom@6.14.2

   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm i styled-reset

   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm i styled-components@6.0.7

   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm i @types/styled-components -D
   ```
