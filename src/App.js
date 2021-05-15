import Title from "./comps/Title.js";
import UploadForm from "./comps/UploadForm";
import ImageGrid from "./comps/ImageGrid";
import styled from "styled-components";
import Modal from "./comps/Modal";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
// import "firebase/firestore"; //database
import { projectAuth } from "./firebase/config";
import googlelogo from "./googlelogo.png";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const auth = projectAuth;
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [userName, setUserName] = useState("");
  const [myAlbum, setMyAlbum] = useState(false);

  const signInWithGoogle = async () => {
    //Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //Set language to the default browser preference
    auth.useDeviceLanguage();
    //start signin process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      setMyAlbum(false);
      setUserName("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAlbum = () => {
    if(myAlbum === false) {
      setUserName(user);
      setMyAlbum(true);
    } else {
      setUserName("");
      setMyAlbum(false)
    }
  }

  useEffect(() => {
    //this detects the change on state of user login
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    //cleanup subscription(the state of login of user to logout)
    return unsubscribe;
  }, [initializing, auth]);
  //useEffect is on the process
  if (initializing) return "Loading...";

  //Get the button

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = () => {
    scrollFunction();
  };

  function scrollFunction() {
    const topBtn = document.getElementById("topBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      topBtn.style.display = "block";
      topBtn.style.visibility = "visible";
      topBtn.style.opacity = 1;
      topBtn.style.transition = "all 2s";
    } else {
      topBtn.style.visibility = "hidden";
      topBtn.style.opacity = 0;
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Main className="App">
      <SignWrap>
        {user ? (
          <>
            <Myphoto onClick={handleAlbum}>{myAlbum ? 'Whole Album' : 'My Album'}</Myphoto>
            <SignOut onClick={signOut}>Log Out</SignOut>
          </>
        ) : (
          <>
            <div className="logIn">
              Join chats <br></br>By logging in : )
            </div>
            <SignIn onClick={signInWithGoogle}>
              <img src={googlelogo} alt="googlelogo" />
            </SignIn>
          </>
        )}
      </SignWrap>
      <ScrollTopBtn id="topBtn" onClick={topFunction}>
        Top
      </ScrollTopBtn>
      <Title />
      <UploadForm user={user} />
      <ImageGrid setSelectedImg={setSelectedImg} userName={userName.displayName}/>
      {selectedImg && (
        <>
          <Modal
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
            user={user}
          />
        </>
      )}
    </Main>
  );
}

const Main = styled.div`
  /* border: 3px solid red; */
  text-align: center;
  padding: 1vw 15vw;
  /* min-width: 375px; */
`;

const ScrollTopBtn = styled.button`
  border: 3px solid red;
  display: none;
  position: fixed;
  bottom: 15px;
  right: 20px;
  z-index: 99;
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: #f37f2d;
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: display 2s;
  @media only screen and (max-width: 500px) {
    right: 7px;
  }
`;
const SignWrap = styled.div`
  /* border: 3px solid yellow; */
  /* width: 100%; */
  position: absolute;
  top: 1.5rem;
  right: 15px;
  display: flex;
  justify-content: flex-end;
  .logIn {
    line-height: 1.3rem;
    @media only screen and (max-width: 500px) {
      display: none;
    }
  }
`;
const SignIn = styled.button`
  border: 3px solid green;
  /* z-index: 99; */
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 1.3rem;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  background-color: white;
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  :active {
    transform: translateY(2px);
    box-shadow: none;
  }
  img {
    /* border: 3px solid red; */
    width: 120%;
  }
`;
const SignOut = styled.button`
  border: 3px solid green;
  /* z-index: 99; */
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  background-color: white;
  color: black;
  cursor: pointer;
  /* padding: 10px; */
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  :active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;

const Myphoto = styled.button`
  border: 3px solid green;
  /* z-index: 99; */
  font-size: 0.65rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  background-color: white;
  color: black;
  cursor: pointer;
  /* padding: 10px; */
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.5);
  :active {
    transform: translateY(2px);
    box-shadow: none;
  }
`

export default App;
