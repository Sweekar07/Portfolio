import { useEffect, useState } from "react";
import styles from "./App.module.css"
import { About } from "./components/About/About"
import { Experience } from "./components/Experience/Experience"
import { Hero } from "./components/Hero/Hero"
import { Projects } from "./components/Projects/Projects"
import { Contact } from "./components/Contact/contact"
import { Navbar } from "./components/Navbar/Navbar"
import { Loader } from "./components/Loader/Loader"
import { SocialLinks } from "./components/SocialLinks/SocialLinks"
import { EmailLink } from "./components/EmailLink/EmailLink";
import { Footer } from "./components/Footer/Footer"
import { CursorEffect } from "./components/CursorEffect/CursorEffect"


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.App} >
      {loading && <Loader onDone={() => setLoading(false)} />}
      {!loading && <CursorEffect />}
      <Navbar />
      <SocialLinks />
      <EmailLink />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
