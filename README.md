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

## 기본적인 routing
1. src/App.tsx (수정) + CSS
  ```
   import { RouterProvider, createBrowserRouter } from "react-router-dom";
   import Layout from "./components/layout";
   import Home from "./routes/home";
   import Profile from "./routes/profile";
   import Login from "./routes/login";
   import CreateAccount from "./routes/create-account";
   import { createGlobalStyle } from "styled-components";
   import reset from "styled-reset";
   
   const router = createBrowserRouter([
     {
       path: "/",
       element: <Layout />,
       children: [
         {
           path: "",
           element: <Home />,
         },
         {
           path: "profile",
           element: <Profile />,
         },
       ],
     },
     {
       path: "/login",
       element: <Login />,
     },
     {
       path: "/create-account",
       element: <CreateAccount />,
     },
   ]);
   
   const GlobalStyles = createGlobalStyle`
     ${reset};
     * {
       box-sizing: border-box;
     }
     body {
       background-color: black;
       color: white;
       font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
                     Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
     }
   `;
   
   function App() {
     return (
       <>
         <GlobalStyles />
         <RouterProvider router={router} />
       </>
     );
   }
   
   export default App;

  ```
2. src/components/layout.tsx (추가)
  ```
   import { Outlet } from "react-router-dom";
   //Outlet은 자식 라우트의 컴포넌트를 렌더링하는 장소를 지정
   
   export default function Layout() {
     return (
       <>
         <h2>layout</h2>
         <Outlet />
       </>
     );
   }
  ```
3. src/routes/home.tsx (추가)
  ```
   export default function Home() {
     return <h1>Home!</h1>;
   }
  ```
4. src/routes/profile.tsx (추가)
  ```
   export default function Profile() {
     return <h1>Profile</h1>;
   }
  ```
5. 접속해서 확인
  ```
  http://localhost:5173/
  http://localhost:5173/profile
  ```
## 개발 시작

### Firebase
- 유저 인증에 관한 작업은 전부 firebase가 함
- 우리가 할 일은 firebase sdk가 유저 정보를 보낼 때까지, 유저에게 보여줄 loading screen을 만드는 것
- 특별히 sdk의 작업 종료를 확인할 필요도 없음. 그냥 2초간 화면을 가려줄 Loading 컴포넌트를 만들어주면 됨
- src/components/loading-screen.tsx
  ```
   import { styled } from "styled-components";

   const Wrapper = styled.div`
     height: 100vh;
     display: flex;
     justify-content: center;
     align-items: center;
   `;
   
   const Text = styled.span`
     font-size: 24px;
   `;
   
   export default function LoadingScreen() {
     return (
       <Wrapper>
         <Text>Loading..</Text>
       </Wrapper>
     );
   }

  //src.App.tsx 수정
  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );

  ```

1. Firebase 로그인 후 프로젝트 생성 -> web app 선택
2. 그 후 vscode의 터미널에서 아래 코드 실행
   ```
   seongjaeyong-ui-MacBookAir:react-fireDB seongjaeyong$ npm install firebase@10.1.0
   ```
3. sdk 복사 + 붙여넣기 (src/firebase.ts)
   ```
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: "AIzaSyBbTiZeRLOdSiKxQvi4juuIsc66hty1E5M",
     authDomain: "react-firebase-99a05.firebaseapp.com",
     projectId: "react-firebase-99a05",
     storageBucket: "react-firebase-99a05.appspot.com",
     messagingSenderId: "1022945754250",
     appId: "1:1022945754250:web:ec5603e3b5b275b3118173",
   };
   
   const app = initializeApp(firebaseConfig);

   ```
4. firebase의 프로젝트 개요에서 Authentication 활성화 하기 (지금은 이메일/비밀번호로만 로그인 활성화)
5. 코드 추가
   ```
   //src/firebase.ts
   //app에 대한 인증 서비스를 사용
   export const auth = getAuth(app);

   //src/App.tsx
   const init = async () => {
       //wait for firebase
       await auth.authStateReady();
       setLoading(false);
   };
   ```
