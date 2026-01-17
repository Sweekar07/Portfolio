import { useEffect, useRef, useState } from "react";
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
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { trackPageView } from "./lib/analytics/trackPageView";

function App() {

  const [pageLoading, setPageLoading] = useState(true);
  const { analyticsData, loading: analyticsLoading } = useAnalyticsData();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!analyticsLoading  && analyticsData && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackPageView(analyticsData);
    }
  }, [analyticsLoading , analyticsData]);

  return (
    <div className={styles.App} >
      {pageLoading && <Loader onDone={() => setPageLoading(false)} />}
      {!pageLoading && <CursorEffect />}
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
