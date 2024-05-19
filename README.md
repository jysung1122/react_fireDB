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
- **firebase/auth/cordova 에서 가져오는 함수 사용하면 안됨**
- **firebase/auth 에서 가져온 함수 사용**
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
  ```
- src/App.tsx 수정
  ```
   function App() {
     const [isLoading, setLoading] = useState(true);
   
     const init = async () => {
       //wait for firebase
       setLoading(false);
     };
   
     useEffect(() => {
       init();
     }, []);
   
     return (
       <>
         <GlobalStyles />
         {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
       </>
     );
   }
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
     apiKey: "{YOUR_API_KEY}",
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
## Firebase 깃허브 로그인 방법 추가하는 법
1. firebase의 Authentication에서 로그인 방법 -> 새 제공업체 추가 -> 깃허브 선택 -> 사용 설정 활성화
2. 새로운 GitHub 애플리케이션을 만들어야함 -> https://github.com/settings/developers 로 이동
3. New OAuth App 클릭
   
   3-1. Application Name : react_firebase
   
   3-2. Homepage URL : https://react-firebase-99a05.firebaseapp.com
   
   3-3. Authorization callback URL : https://react-firebase-99a05.firebaseapp.com/__/auth/handler
   
   - 3-2는 3-3에서 따온 주소이고 3-3은 firebase에서 1번을 수행하면 나오는 주소이다
     
   3-4. Register Application 버튼 클릭
     
4. 깃허브의 Client ID와 Client secrets를 firebase에 붙여넣기
   
5. 저장하면 깃허브 로그인 사용 가능하게 됨

### 깃허브로 로그인하는거 코드에 활성화 시키기
1. https://github.com/logos 로 가서 로고 다운받기
2. github-mark.svg 파일을 vscode의 public 폴더로 복사
3. 컴포넌트 생성 후(src/components/github-btn.tsx) login이나 createAccount에 사용
   ```
   import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
   import styled from "styled-components";
   import { auth } from "../firebase";
   import { useNavigate } from "react-router-dom";
   
   const Button = styled.span`
     margin-top: 50px;
     background-color: white;
     font-weight: 600;
     padding: 10px 20px;
     border-radius: 50px;
     border: 0;
     display: flex;
     gap: 5px;
     align-items: center;
     justify-content: center;
     color: black;
     cursor: pointer;
   `;
   const Logo = styled.img`
     height: 25px;
   `;
   
   export default function GithubButton() {
     const navigate = useNavigate();
     const onClick = async () => {
       const provider = new GithubAuthProvider();
       try {
         await signInWithPopup(auth, provider);
         navigate("/");
       } catch (e: any) {
         if (e.code === "auth/popup-closed-by-user") {
           return;
         } else if (e.code === "auth/account-exists-with-different-credential") {
           alert("This email is already in use");
           return;
         }
       }
     };
   
     return (
       <Button onClick={onClick}>
         <Logo src="/github-mark.svg" />
         Continue with Github
       </Button>
     );
   }

   ```
### 웹앱에서 firebase로 데이터 보내기
- src/components/post-form.tsx
  ```
      setLoading(true);
  //1. 로딩 상태를 활성화합니다. 이렇게 하면 사용자가 데이터가 처리 중임을 알 수 있습니다.
  
      const doc = await addDoc(collection(db, "posts"), {
        post,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
  //2. posts 컬렉션에 새 문서를 추가합니다. 문서에는 게시물 내용(post), 생성 시각(createdAt), 사용자 이름(username), 사용자 ID(userId)가 포함됩니다.
	
      if (file) {
  	if (file.size > 1024 * 1024 * 1) {
          alert("사진은 1MB 이하로 제한해주세요.");
          return;
        }
        const locationRef = ref(
          storage,
          `posts/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
  //3. 파일이 있는 경우:
	•	파일을 저장할 위치를 지정하는 참조(locationRef)를 생성합니다.
	•	파일을 지정된 위치에 업로드합니다.
	•	업로드된 파일의 다운로드 URL을 얻습니다.
	•	다운로드 URL을 새로 추가된 문서의 photo 필드에 저장합니다.

      setPost("");
      setFile(null);
  //4. •	게시물 내용 입력 필드를 비웁니다.
	    •	파일 선택을 초기화합니다.
  ```

  ### firebase에서 웹앱으로 데이터 가져오기
  - src/components/Timeline.tsx
    ```
    const [posts, setPosts] = useState<IPost[]>([]);
    //1. posts라는 상태 변수를 초기화합니다. 이 변수는 IPost 타입의 배열로 설정되며, 초기값은 빈 배열입니다.
	
	const fetchPosts = async () => {
    //2. 게시물을 가져오는 비동기 함수를 정의합니다.
	     const postsQuery = query(
	     collection(db, "posts"),
	     orderBy("createdAt", "desc")
	   );
    //3. posts 컬렉션에서 createdAt 필드를 기준으로 내림차순(desc)으로 정렬된 쿼리를 생성합니다.

	   const snapshot = await getDocs(postsQuery);
    //4. 생성된 쿼리를 실행하여 문서 스냅샷을 가져옵니다.
	   const posts = snapshot.docs.map((doc) => {
	   const { post, createdAt, username, userId, photo } = doc.data();
	   return {
	   post,
	   createdAt,
	   username,
	   userId,
	   photo,
	   id: doc.id,
	   };
	});
    //5. 스냅샷의 각 문서를 매핑하여 필요한 데이터 필드(post, createdAt, username, userId, photo)와 문서 ID(id)를 포함한 객체 배열로 변환합니다.
	
	setPosts(posts);
      };
    ```
