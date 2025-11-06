import { useEffect, useState } from "react";
import styles from "./App.module.css"
import { About } from "./components/About/About"
import { Experience } from "./components/Experience/Experience"
import { Hero } from "./components/Hero/Hero"
import { Projects } from "./components/Projects/Projects"
import { Contact } from "./components/Contact/Contact"
import { Navbar } from "./components/Navbar/Navbar"
import { Loader } from "./components/Loader/Loader"
import { SocialLinks } from "./components/SocialLinks/SocialLinks"


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Minimal delay so animation plays even on fast loads
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.App} >
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Navbar />
      <SocialLinks />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
