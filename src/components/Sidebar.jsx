import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
export default function Sidebar() {
  return (
    <main className="sidebar">
      <Navbar/>
      <Search/>
      <Chats/>
    </main>
  )
}
