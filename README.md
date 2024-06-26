# react_fireDB

- [리액트 공부](https://github.com/jysung1122/ReactStudy) 이후 진행하는 프로젝트
- FireBase를 이용하여 게시판 기능 구현

### 개발하면서 아쉬운 점
1. 프로필 페이지에서 닉네임이나 글 삭제, 업데이트 등을 하면 새로고침을 해야 반영이 된다는 점
2. 유저 네임을 업데이트 해도 이전에 올렸던 게시글까지 함께 업데이트 되지 않는 다는 점
3. 백엔드를 공부하고 싶었지만 firebase에 기능 구현이 다 되어 있어 아쉬움
4. firebase의 함수를 활용하는 법만 배우고 DB에 저장하거나 불러오는 직접적인 백엔드 개발 공부를 못하였음 ㅜ.ㅜ

## 실행화면
- 로그인 페이지
<img width="1440" alt="스크린샷 2024-05-22 오전 11 31 30" src="https://github.com/jysung1122/react_fireDB/assets/56614779/cf7d5f8e-5f41-451d-a39c-1723f381861c">

- 회원가입 페이지
<img width="1440" alt="스크린샷 2024-05-22 오전 11 33 32" src="https://github.com/jysung1122/react_fireDB/assets/56614779/f98e12d6-6fd7-4384-ad5e-b4af65a5d9ba">

- 메인 페이지
<img width="1440" alt="스크린샷 2024-05-22 오전 11 33 59" src="https://github.com/jysung1122/react_fireDB/assets/56614779/693bba58-d0b7-48f8-b263-e3882a067fd1">

- 프로필 페이지
<img width="1440" alt="스크린샷 2024-05-22 오전 11 34 18" src="https://github.com/jysung1122/react_fireDB/assets/56614779/e7bb8373-768e-48a4-9c77-4c6aeefbc40a">



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
2. src/components/layout.tsx (생성)
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
3. src/routes/home.tsx (생성)
  ```
   export default function Home() {
     return <h1>Home!</h1>;
   }
  ```
4. src/routes/profile.tsx (생성)
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
     appId: "{YOUR_APP_ID}",
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
### firebase에서 웹앱으로 가져온 데이터 출력하기
- src/components/post.tsx
  ```
  //이 코드는 Post라는 React 함수형 컴포넌트를 정의하고 기본적으로 내보냅니다.
  //Post 컴포넌트는 username, photo, post라는 세 개의 속성을 받습니다. 이 속성들은 IPost 타입으로 지정됩니다.
  	export default function Post({ username, photo, post }: IPost) {
	  return (
	    <Wrapper>
	      <Column>
	        <Username>{username}</Username>
	        <Payload>{post}</Payload>
	      </Column>
	      {photo ? (
	        <Column>
	          <Photo src={photo} />
	        </Column>
	      ) : null}
	    </Wrapper>
	  );
	}
  ```
### Timeline 실시간으로 가져오기
- src/components/Timeline.tsx
  ```
  export default function Timeline() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );
    await onSnapshot(postsQuery, (snapshot) => {
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
      setPosts(posts);
    });
  //onSnapshot 함수를 사용하여 postsQuery에 대해 실시간으로 스냅샷을 구독합니다.
  //스냅샷이 업데이트될 때마다 콜백 함수가 호출됩니다.
  //각 문서를 매핑하여 필요한 데이터 필드(post, createdAt, username, userId, photo)와 문서 ID(id)를 포함한 객체 배열로 변환합니다.
  //변환된 게시물 배열을 posts 상태 변수에 저장합니다.
  };
  ```
### 사용자가 타임라인을 보고 있을 때만 관련 이벤트를 듣게하기
- src/components/Timeline.tsx
  ```
  export default function Timeline() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let unsubcribe: Unsubscribe | null = null;
  //unsubscribe 변수는 Firestore의 실시간 업데이트 구독을 해제하기 위한 함수를 저장하는 용도로 사용됩니다.
  //초기값은 null로 설정되어 있습니다. 이는 아직 구독이 설정되지 않았음을 의미합니다.
  
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );
      unsubcribe = await onSnapshot(postsQuery, (snapshot) => {
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
        setPosts(posts);
      });
    };
    fetchPosts();
    return () => {
      unsubcribe && unsubcribe();
    };
  //useEffect 훅의 클린업 함수로, 컴포넌트가 언마운트될 때 호출됩니다.
  //unsubscribe가 null이 아니면(즉, 구독이 설정되어 있으면) unsubscribe 함수를 호출하여 Firestore 구독을 해제합니다.
  //이렇게 하면 컴포넌트가 사라질 때 구독이 해제되어 불필요한 리소스 사용을 방지하고, 메모리 누수를 예방할 수 있습니다.
  
  }, []);
  ```
### Post 삭제하기 & 수정하기
- src/components/post.tsx
  ```
	const Post = ({ username, photo, post, userId, id }: IPost) => {
	  const user = auth.currentUser;
	  const [editMode, setEditMode] = useState(false);
	  const [editValue, setEditValue] = useState(post);
	  const [isLoading, setLoading] = useState(false);
	  const [lastValue, setLastValue] = useState(post);
	  const [file, setFile] = useState<File | null>(null);
	
	  const onDelete = async () => {
	    const ok = confirm("Are you sure you want to delete this post?");
	    if (!ok || user?.uid !== userId) return;
	    try {
	      await deleteDoc(doc(db, "posts", id));
	      if (photo) {
	        const photoRef = ref(storage, `posts/${user.uid}/${id}`);
	        await deleteObject(photoRef);
	      }
	    } catch (e) {
	      console.error(e);
	    }
	  };
	
	  const onEdit = async () => {
	    setEditMode(true);
	  };
	
	  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	    setEditValue(e.target.value);
	  };
	
	  const onSave = async () => {
	    if (isLoading || user?.uid !== userId) return;
	    try {
	      setLoading(true);
	      await updateDoc(doc(db, `posts/${id}`), { post: editValue });
	      if (file) {
	        const locationRef = ref(storage, `posts/${user.uid}/${id}`);
	        deleteObject(locationRef).catch((e: FirebaseError) => {
	          if (e.code === "storage/object-not-found") {
	            return;
	          } else {
	            console.error(e);
	          }
	        });
	
	        const result = await uploadBytes(locationRef, file);
	        const url = await getDownloadURL(result.ref);
	        await updateDoc(doc(db, `posts/${id}`), { photo: url });
	        setFile(null);
	      }
	
	      await setLastValue(editValue);
	      setEditMode(false);
	    } catch (e) {
	      console.error(e);
	    } finally {
	      setLoading(false);
	    }
	  };
	
	  const onCancel = () => {
	    setEditValue(lastValue);
	    setEditMode(false);
	  };
	
	  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
	    const { files } = e.target;
	    if (files && files.length === 1) {
	      setFile(files[0]);
	    }
	  };
	
	  return (
	    <Wrapper>
	      <Column>
	        <Username>{username}</Username>
	        {editMode ? (
	          <Input
	            name="post"
	            value={editValue}
	            onChange={onChange}
	            placeholder="Enter the post to update."
	          />
	        ) : (
	          <Payload>{post}</Payload>
	        )}
	        {user?.uid === userId ? (
	          <div>
	            <Button $isRed={true} onClick={editMode ? onCancel : onDelete}>
	              {editMode ? "Cancel" : "Delete"}
	            </Button>
	            {!editMode ? (
	              <Button onClick={onEdit} disabled={isLoading}>
	                Update
	              </Button>
	            ) : (
	              <Button onClick={onSave}>
	                {isLoading ? "Saving.." : "Save"}
	              </Button>
	            )}
	          </div>
	        ) : null}
	      </Column>
	      <Column>
	        {editMode ? (
	          <>
	            <EditPhoto htmlFor="editPhoto">
	              {file ? "Edited Photo ✅" : "Edit Photo"}
	            </EditPhoto>
	            <File
	              type="file"
	              accept="image/*"
	              id="editPhoto"
	              onChange={onChangePhoto}
	            />
	          </>
	        ) : photo ? (
	          <Photo src={photo} />
	        ) : null}
	      </Column>
	    </Wrapper>
	  );
	};
  ```
### 유저 프로필 이미지 생성 및 교체
- src/routes/profile.tsx
  ```
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  ```
### 프로필 페이지에 유저가 올린 게시글 출력하기
- 사용자의 posts만 가져오는 query 만들기
- firebaseRK WPRHDGKSMS query의 where 옵션을 사용하여 읽어올 데이터를 필터링 할 수 있음
- where에는 3개의 인자가 필요하며, 1번은 doc, 2번은 연산자, 3번은 우리가 원하는 조건
- 데이터를 필터링하거나 다양한 정렬옵션을 주고 싶다면 .firebase에게 미리 해당 정보를 줘야함
- 쿼리를 날린 후 브라우저의 콘솔에서 설정창링크를 확인할 수 있음
- src/routes/profile.tsx
  ```
  const fetchPost = async () => {
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(postQuery);
    const posts = snapshot.docs.map((doc) => {
      const { post, createdAt, userId, username, photo } = doc.data();
      return {
        post,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setPosts(posts);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  ```
