# Electron-login-join-chat-App(with firebase )




firebase 와 react (withTs)를 활용한 백엔드 프론트엔드 구현 =>  로그인 / 회원가입  & chat  desktop 어플리케이션  제작 repo  <br>
디자인 : mui 사용 
<br><br><br>


## 진행 사항 
  ~2022.08.15- 기본 electron 세팅 및 mui 사용 login / join 페이지 생성 기본 디자인 <br><br>
2022.08.16 - 자체 이메일 로그인 회원가입 / jwt 토큰 / firebas auth / 로그아웃  기능 구현 만 완료  완료 후 이동 view  , auth provider 등 미결 문제들 있음 <br><br>
2022.08.17 - send message 데이터 구조 생성 및 데이터 베이스에 추가 & 들어간 메세지들 실시간 감시 , get method 구현 console 에서 확인 <br><br>
2022.08.18 - 채널 생성에 따른  messages 데이터 객체 수정 / 채널 생성 버튼 및 채널 실시간 감시 , get , firestore에 쌓인 데이터 orderby 로 시간 순 정렬 / 시간 순 정렬을 위해 채널 객체에도 만든 시간 추가  , message 에 ref 추가 자동으로 focus 스크롤 내려오게 구현 <br><br>
2022.08.19 - login , join 데이터 베이스 전송 displayname 수정  userlogin provider 생성 , login 유지 토큰 말고 다른 방법으로 로직 변경 , meesage 본인 과 타인에 따른 상태변경 및확인, channel 변경 구현  <br><br>

2022.08.22 - userList 불러오기 / 로그인시 user id/ name / email 정보만 따로 users 생성하여 저장 / test modal view 구현  현재 체크 해서 value 전송해서 초기 채널 init 시에 초대되어있다면 채팅방 자동 생성 되어있게 끔 구현중 , 방식 생각 중 user list 데려올때 자기 자신 달라보이게 끔 하기 등등 아직 많이 남음 

2022.8.24 - auth provider 문제 context api 사용으로 해결 및 auth 상태에따른 redirect 및 해당 부분으로 구현된 부분들 fix 


2022.8.25 - NotFounPage router에 추가 접속시 main 으로 redirect 

~2022.8.30 -  다이어그램 작성 및 채널 init 이나 접근 방법에 대해서 다시 생각해보는 중 

22.8.31 - 채널생성시 유저 넣는 작업 등이 매끄럽지 못한 이유가 백엔드 적인 지식의 부족이라 firebase 활용이 매끄럽지 못하다 판단하여 nodejs 공부중 (잠시 중단)

![image](https://user-images.githubusercontent.com/89845540/187358570-3c7fc3a8-77eb-47d8-a7e5-930d6a87a2d5.png)

<br><br><br>

## 사용기술 
![REACT](https://img.shields.io/badge/-REACT-blue?style=plastic=?style=for-the-badge&logo=react)
![MATERIALUI](https://img.shields.io/badge/-MATERIALUI-black?style=plastic=?style=for-the-badge&logo=mui)
![JAVASCRIPT](https://img.shields.io/badge/-javascript-blue?style=plastic=?style=for-the-badge&logo=javascript)
![TypeScript](https://img.shields.io/badge/-typescript-black?style=plastic=?style=for-the-badge&logo=typescript)
![FIREBASE](https://img.shields.io/badge/-FIREBASE-blue?style=plastic=?style=for-the-badge&logo=firebase)
![ELECTRON](https://img.shields.io/badge/-ELECTRON-black?style=plastic=?style=for-the-badge&logo=electron)


<br>
<br>


## 현재 폴더 트리 

```📦src
 ┣ 📂Components
 ┃ ┣ 📜Appbar.tsx
 ┃ ┣ 📜Channel.tsx
 ┃ ┣ 📜Message.tsx
 ┃ ┣ 📜SendChat.tsx
 ┃ ┗ 📜UserList.tsx
 ┣ 📂pages
 ┃ ┣ 📜AuthValidPage.tsx
 ┃ ┣ 📜ChatMain.tsx
 ┃ ┣ 📜Join.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┗ 📜NotFound.tsx
 ┣ 📜Auth.tsx
 ┣ 📜firebase.js
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┣ 📜Router.tsx
 ┗ 📜setupTests.ts
 
```


## 구현사항 (page 별)

### Login 

<br>
<br>

기본 validation 에 따른 button 활성 / 비활성화 

설정한 validation과 별개로 firebase 에서 유효하지않은 id / pw 면 로그인 불가 

<br>
<br>


<br>

![이미지 003](https://user-images.githubusercontent.com/89845540/186070149-2061891c-0306-4a35-9407-c502f91332c9.gif)




``` JS

  const Validation = userInputValue.id && userInputValue.pw.length > 6;

``` 

<br>




<br>

### Join 

<br>
- 프론트 
join 페이지와는 다른 validation 적용  (정규식)


https://user-images.githubusercontent.com/89845540/186070396-c50c6c64-3468-4f17-b456-e0b0719cefd5.mp4




```js

const PW_REG = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const EMAIL_REG =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

```
<br>

```js

   PW_REG.test(userJoinValue.pw)
 
 
 ```
 
 
 - firebase
 
 
 ```js
 
 
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
      displayName: name,
    });
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
 ```
 

![image](https://user-images.githubusercontent.com/89845540/186073047-20dd1f61-bdc3-4836-9205-08eb0f64a5e5.png)




### ChatMain 

auth 인증상태 에 따른 redirect 처리 / context api 사용 한 user 정보 처리 




https://user-images.githubusercontent.com/89845540/186070510-a42fa895-6a2d-4c78-a2c7-46a2d817210e.mp4









<br><br>
##  구현하면서 우여곡절 & 느낀 점 
<br><br>


### -FIREBASE Login/Regist

<br>
<b>1. 로그인 / 회원 가입 파트</b> 

사실 로그인 회원 가입은 생각보다 어렵지 않았다. 이미 카카오 소셜 로그인을 예전에 프로젝트를 통해 해보면서 생각보다 별 거없다는 걸 알고있어서 그렇기도 하고 오히려 그래서 소셜 로그인은 제외하고 시작했다 내가 다 해보고 싶어서. 아무튼, user의 displayName 을 update 한다거나 하는것도 생각보다 어렵지 않았다. 

외려 모든 user 의 정보 같은것들을 형성 시킬때 내가 구성한 정보들 내가 구성한 객체들로 만든다는 것이 굉장히 재미있었다.<br><br>

![image](https://user-images.githubusercontent.com/89845540/185728204-ae132261-de51-4fc2-bd63-b88062a271ed.png)

나의 user.... 나의 test 분신들 제공업체 이메일 표시는 자체 이메일로 회원가입 시킨 것들이라 그렇다. 구글 이면 구글모양 있음 

<br>
<br>



<b>2. 인증 유지 / provider</b>


<details>
<summary>이전 미결사항(해결) </summary>

아직도 사실 이부분의 조금 미결이라는 생각 이 드는 데 맨 처음에는 login 후 res 객체에 token을 뺴내서 view를 구현하고 바꿨는데 
사실 만약 유저가 token 이라는 것의 존재를 알고 localstorage를 조작할줄안다면 거기에 token 값이 유효하던 말던 그냥 token 만 넣어도 로그인이 되는거나 마찬가지여서 이 부분이 마음에 들지 않아 변경 하게 되었고 좀 더 공부하고 싶은 생각이들었다. 

아 물론 서버에서 의 로그인 상태와는 당연히 상관없다. 그냥 view 적인 걸 구현할떄의 이야기 

session stroage 나 refresh token 같은것들의 개념은 알고 있고 firebase에 인증상태 유지 문서에 나와있는 방법도 알고 firebase 문서가 친절한  편인것도알겠는데 하다보니까 모든게 다적혀있지는 않아 적용에 문제가 좀 있다보니.

현재 

원래는 인증상태를 전체에 BrowserRouter 마냥 provider 시키고 싶었는데 현재는 유저 정보를 hook 마냥 auth를  만들어서 import 하여 사용하고 있다. redux를 사용하여 store 에 저장시켜놓고 쓰면 지금보다는 나은 상태가 되겠다 하는 생각은 들지만 현재는 엄청 복잡한 구조가 아니라 당장에는 지금 같은 상태로 훅을 통해 유저 로그인 상태 정보 객체를 불러오고 logout 시키고있다. 결과적으로는 초기 token 을 저장시키는 것보다는 굉장히 좀 더 인증스러워졌지만 많이 부족함을 느낀다. <br><br>

</details>


provider 가 개인적인 blocker 였는데 react-router의 공식홈페이지에 authentication 의 구현 방법이 있었다. 물론 한 몇시간 동안 혼자 보면서 적용해야 됬지만 

결론적으로 context api를 사용하여 구현했다.

```Tsx

src/auth 파일 


interface AuthContextType {
  isAuthenticated: Boolean;
  currentUser: {};
}

let AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user.providerData[0]);
      setIsAuthenticated(true);
    } else {
      setCurrentUser({});
      setIsAuthenticated(false);
    }
  });

  return <AuthContext.Provider value={{ currentUser, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}

```


<br>
<br>

- navigate 

<br>
<br>

원래 firebase 쪽에서 login 시 method 가 실행되기때문에 windowloaction 주소를 firebase에서 react navigate 같은 함수를 사용하지않고 

이동시켰는데 auth Provider와 validPage의 리다이렉트가 제대로 작동하지않았다. 정확히는 로그인 이 되고 콜백이 전부 되고 이동이 되어야 되는데 그전에 컴포넌트가 들어가다보니 상태변화를 인지못하고 바로 redirect 시켜버리는것이였다.

그래서 firebase 함수는 firebase.js에서 다 관리해야지 해서 만들어둔 분리였지만 따로 빼내어서 Login 쪽으로 옮겨 navigate를 시켜주었다

왜 굳이 navigate 같은 함수들을 써야되는지 알 수 있었던 좋은 경험이였다.

<br>
<br>


- children 

<br>
<br>

공식 예제대로 내것에 적용하는 도중 

![image](https://user-images.githubusercontent.com/89845540/186393850-76f6579e-4601-4c0c-ad83-f91cb7fb893d.png)

Type '{ children: Element; }' has no properties in common with type 'IntrinsicAttributes'.ts(

라는 에러가 떠서 당황했는데 
<br>
<br>

props 해줄게없는데 children 을 쓰고 있을때 나오는 에러라고한다. 

알고보니 validPage에서 else children 을 해줘야되는걸 빈 걸로 하면 알아서 밑으로 내려가겠지 하고 <></> 로 퉁쳐버린 탓이였다 


그것도 모르고

![image](https://user-images.githubusercontent.com/89845540/186393922-1d5f5028-6298-40d5-b9ad-8e638eab6e48.png)

이렇게 하니까 에러 사라진다! 하고 잠깐 좋아했었다 



사실 우여곡절이긴 했지만 react-router 공식홈페이지에 데모 시연되어있는 것을 참고로 해서 했기 때문에 대부분 좀 더 오래 코드를 뜯어보고있으면 다 해결되었다. 




<br>
<br>
<br>
<br>



### -FIREBASE FIRESTORE

<br>

<b>1. fireStore/ RealTime database</b> 


이미 한번 sendbird api를 통해 채팅을 구현했던 경험이 있었고 당시에 vue로 구현 하는데 있어 sendbird 가 vue를 공식적으로 지원하지 않아 그냥 로컬로 내가 만들어야 되나 싶어 찾아보다가 소켓 개념까지 얼추 알고있었기에 이런 부분을 염두해두고  firebase에 실시간 데이터 베이스와 firestore 두가지 가 있는데 뭘 선택해야되는지 고민이 있었다. 당연히 RealTime을 써야 되지 않을까 하고 있다가 한 번 찾아보기로 했다.

원래 태초에는 의외로 실시간 데이터 베이스가 먼저 존재했다고 한다. 뭐 어떤 목적으로 쓸 건지 같은것들 에따라 다르지만 fireStore 가 조금 더 개선 된 버젼이라는 말을 볼 수 있었다. 

이러한 정보는 파이어 베이스는 꼭 웹만 쓰는 게 아니고 database , 인증 같은것들을 제공해서인지 검색하다보면 해외 안드로이드 같은 모바일 구현 사항들도 굉장히 많이 나왔는데 그 중에 어느 웹사이트의 글에 나랑 똑같은 의문에서 무엇을 선택해야되는지 에 대해 정리한 글에서 알게 되었다. 안드로이드 쪽 어떤 tutorial 사이트 같았는데 불행히 영어 구문만 따로 저장해놓고 사이트 가 어딘지 잊어버렸다 

<br>

<b>2. 데이터 구조화 </b>


사실 처음 부터 아예 메세지 보내는 건 그렇다 치고 이 메세지 객체를 어떻게 구조화를 시켜야 되지 ? 하는 불안 이 있었는데 다행히 나는 vue로 sendbird를 통해  view 를 구현하면서 sendbird 에서 보내는 message 객체가 어떻게 생겼는 지 자세히 볼 기회가 이미 있었다. 

그리고 아직 어떤 데이터베이스 를 써야될지 못정했을때 

https://firebase.google.com/docs/database/web/structure-data

firebase 공식문서에서 이런 부분에 대한 조언? 가이드 라인도 볼 수 있었고 

조금 더 나아가  아예 다른 해외 사이트에서 

![image](https://user-images.githubusercontent.com/89845540/185726473-b2324723-e327-40ba-bb86-2ba99687f3a4.png)

<br><br>

이런식으로 messages 객체가 구성되어있는 것을 참고할 수 있었다.

다만 굳이 저게 아니여도 sendbird 썼던 때에 걸 그냥 봐도 됬기에, 

어찌됬건 내가 데이터 베이스를 처음부터 만들어야되는 상황이라서  사실 만들때는 그냥 아예 자르고 자르고 잘라서 보낸 메세지와 메세지 보낸 시점 정도만의 정보를 넣어주고 시작했다 

<br>
<br>

![image](https://user-images.githubusercontent.com/89845540/185726507-93a70a12-48c4-42f1-8ebf-162605670b7e.png)
<br><br>

시험에 시험을 거쳐  messages 객체와 messages 객체의 depth 같은것들이 변경되었다 

<br><br><br>

![image](https://user-images.githubusercontent.com/89845540/185726524-2450e43c-cd36-4168-9de6-a719d73b73be.png)
![image](https://user-images.githubusercontent.com/89845540/185726525-7e0f422a-d3be-417d-aa5b-c5eb2fec8cd2.png)

<br><br><br>


후에 채널을 핸들하게 되면서 객체 구조는 또 변경되었다.<br>

애초에 내가 모든걸 다 만들어야 되는 건 처음이여서 엄청나게 우여곡절이 많았다. addDoc 을 쓰면 id 가 위에처럼 자동 생성되어서 depth 가 들어가는데 그래선 원하는 데이터 구조를 못만들고...  addDoc으로 만들려면 인자를 무조건 홀수로 줘야되고 .. 뭐 어떤 메서드는 또 무조건 짝수로 달라고하고 


<br><br>

<b>3. messages 불러오기</b> 

이제 실시간으로 messages들을 불러와야되는데 fireStore 에는 실시간으로 감시할 수 있는 method를 제공하고있었다 onSnapshot이라고 

![image](https://user-images.githubusercontent.com/89845540/185726787-ff03b92e-2509-412e-b32f-a4a1a212b3f0.png)

<br>
처음에는 orderBy 를 몰라서 그냥 데리고 왔다가 뒤죽박죽으로 섞이는거 보고 망했다 했는데 별 생각없이 메세지에 기본적으로 생성날짜정도는 들어가야지 하고 만들었던 creatAt 를 serverStamp 메서드로 넣어놔서 해당기준으로 orderBy 하여 해결했다. 

<br>
<br>




### Mui 

~~여담이지만 import 할때 '무이'라고 읽었다 왜 마테리얼 ui 이인데 무이지? 했는데 생각해보니 엠 유아이라고 읽~~
<br>

<br>

vuetify를 썼을때도 그랬지만 생각보다 편리하지만 생각보다 불편했다. 이것도 결국 라이브러리 라 확실히 css를 잘하면 잘할 수록 편한 것은 맞겠지만 급하게 빨리 구현해볼려고 갖다 쓴거라 좀 느긋하게 보고 있을 시간도 없어서 좀 전체적으로 급박하게 진행 했다. 쓰면 쓸수록 편해지겠지

mui 의 primary 컬러가 이미 있길래 썼는데 생각보다 색이 구렸다 일단 만들어야되서 지금은 그냥 모양 만 갖추고 내버려뒀다 

<br>
<br>





### TypeScript

의외로 있으면 그냥 편할줄 알았는데 react 에다가 적용하니까 생각지도 못한 부분에서 에러가 많이 생겼고 일일이 interface를 주지않아도 useState 같은것들은 이미 react관련해서 다 정의가 내려져있지만 리팩토링할때 이런부분도 그냥 일일이 interface를 주는것도 하나의 코드 가독성을 올려주는 리팩토링이 되지않을까 ? 하고 생각했다.

이미 충분히 read me 치곤 너무 길지만 정말 typescript 오류 까지 다적으면 너무 길거 같아서 제외해야겠다 처음 적용한 한거라 업데이트 함수 내려줄때도... map 돌릴때 item 에서도 ...온갖 이벤트 들 이나 useRef 에러 객체 등등 그냥... 그런 일들이 있었다. 심지어 오류는 뭔소리인지 알아보기도 어려웠다 
<br>
<br>
<br>


### ELECTRON 

아직... 일렉트론을 그렇게 많이 써보지 못했다 그저 처음 초기 세팅 해놓고 yarn electron-build 를 해보니 dist 폴더에 exe 파일 이 생기고 눌러서 해보니 오 react 초기 화면이 나오네 하고 신기했던 정도와 중간 중간에

yarn-electorn-start 하니까 프로그램 창 마냥 떳던것이 굉장히 신기한 정도 그리고 electorn 을 아직 막 팔정도의 시간이없어 파진 못했는데 그래서 사실상  지금 느끼기로는 그저 builder 라는 느낌이다. 

그래서 지금 상태로는 그냥 프로젝트 명이 무색하게 프로그램 적인 뭔가는 없고 react로 build 하면 그냥 웹이 될 수 도있어서 두가지 방향 모두다 build하는 방향으로 파 볼려고 생각하고있다. 


![image](https://user-images.githubusercontent.com/89845540/185728440-f52fadc2-bc00-4fcf-bb21-e2d14c8a5c66.png)

이렇게 프로그램 처럼 돌아간다 

<br>
<br>



### 전체적으로 느낀점, 신경쓰려 했던 점 

<br>
이미 나는 이전 프로젝트 를 통해 소셜 로그인이나 외부 api를 사용할때 공식문서의 중요성을 실감하고 있고 잘 알고있었다. 

알고는 있었지만 늘 그렇게 하지만은 못했던 공식문서를 보면서 개발하기 를 많이 많이 적용하려고 했다. 앞으로도  당연히 그럴 생각이고 그래서 가능하면 블로그 글 같은것들을 아예 배제하려고는 하지 않지만 지양하려고 하고있다.

넘쳐나는 클론 강의 들도 마찬가지.. 실제로 막히는 부분은 대체로 firebase 공식문서 나 github 코드들을 보면서 많이 해결 해 나갔다


그래서 나름대로는 이 프로젝트를 혼자 진행하면서 의미가 깊다.

<br>


또 아키텍쳐의 중요성 같은것들을 미세하게나마 많이 느끼고 있어서 나름대로 개발하는 대에 방법론이나 mvc 모델 별로 나누어서 개발해 보려고 애를썼는데 각각이 model, view , controller 라는건 알겠는데 약간 분리가 스무스하지 못했다.

<br>

단지 예전에 처음 원리 나 개론 적인 부분들을 배울때 어떤 컴포넌트든 자바스크립트 함수든 디자인을 할때 굳이 마인드맵 처럼 그려보는 과정의 필요성을 알고는 있었지만 굳이 느끼진 않았다면 이번엔 직접 적용해 보려 하면서 간단해 보이는 것이라고 이런 연습이 도움이 된다는 것을 많이 느꼈다. 

<br>
<br>


![image](https://user-images.githubusercontent.com/89845540/185727520-be9302d8-2010-487e-9653-31b1d96626ca.png)


<br>
<br>
<br>



## 앞으로 추가할 사항 및 개선 사항 
<br>

~~유저리스트 불러오기~~


~~provider 좀 더 공부해서 구현 해보기 (or Redux) /router 접근~~ 
<br>

* 공통: 급하게 구현 하느라 신경쓰지 못한 부분들의 정리 및 변경 
<br>

1. 기능 추가에 따른 message 객체 변경 (이미지 업로드 등등)

3. 채널에 user 동적 추가 로 인한 1:1/ 단체 채널 생성 => 그에 따른 채널 에대한 class 도 변경될수있을것같다 

5. 현재 로딩 상태 같은 것들은 구현하지 않았는데 그 부분 고려 
6. ui 고도화
7. 사용 자 편의를 위한 처리안하고 그냥 넘어갔던 자잘한 기능들 수리 









