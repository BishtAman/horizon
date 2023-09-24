import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

export default function Home() {
  return (
    <main className='home'>
      <section className='container'>
        <Sidebar/>
        <Chat/>
      </section>
    </main>
  )
}
