import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc, 
} from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from '../context/AuthContext'
export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useContext(AuthContext)
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      // Clear the error state if the search is successful
      setErr(false);
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async ()=>{
    // check 
    const combinedId = currentUser.uid>user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try{
      const res = await getDoc(doc(db, "chats", combinedId))
      if(!res.exists()){
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {messages: []})
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp() 
        });

        await updateDoc(doc(db, "userChats", user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp() 
        });
      }
    } catch(err){
      console.log(err.message)
    }
    setUser(null)
    setUsername("")
  }

  return (
    <main className="search">
      <section className="searchForm">
        <input
          className="searchInp"
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={handleSearch}>Search</button>
      </section>
      {err && <span>Error: User not found</span>}
      {user && (
        <section className="userChat bg-[#21695d]" onClick={handleSelect}>
          <img
            className="w-[50px] h-[50px] rounded-[50%] object-cover"
            src={user.photoURL}
            alt="img"
          />
          <section className="userChatInfo">
            <span className="text-xl">{user.displayName}</span>
          </section>
        </section>
      )}
    </main>
  );
}
