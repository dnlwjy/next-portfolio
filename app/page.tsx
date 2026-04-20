import Ava from '../components/Ava'
import MotionDiv from '../components/MotionDiv'
import LinkButton from '../components/LinkButton'
import CaseStudySection from '../components/CaseStudySection'
import AboutImage from '../components/AboutImage'

export default function Home() {
  console.log("─── HOME ──────────────────────────────────────────────────────")
  return (
    <main>

      {/* Hero Section */}
      <section id="hero" className="h-screen p-4">
        <div className="max-h-225 flex flex-col flex-1 py-0 h-[85%] relative">

          <Ava />

          <MotionDiv
            variant="up"
            styles="flex flex-col gap-12 items-center z-10">
            <h1 className="text-center">
              <span className="text-(--gray)">I'm Daniel</span>
              <br />
              UX Engineer
            </h1>
            <div className="flex gap-6 items-center">
              <LinkButton
                title="Contact"
                link="/contact"
              />

              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" fill="none" viewBox="-1 -1 7 12"><path stroke="var(--gray)" strokeWidth=".5" d="M.826 9.949H0L3.318.05h.826z" /></svg>
              <LinkButton
                title="View CV"
                link="https://drive.google.com/file/d/1g2-1tF6l2J3GOTJN6D0DE1R_SZnUv4wU/view"
              />
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Case Study Sections */}
      <CaseStudySection
        title="Increased Conversions 35% with Custom Analytics and A/B Testing"
        description="jago pasang cookies untuk ngetrack button, links, behavior lainnya, jago pasang GA 4, Jago a b testing pakai data"
        link="#"
        darkVideo="/casestudy-1-b.webm"
        lightVideo="/casestudy-1-w.webm"
      />
      <CaseStudySection
        variant="type B"
        title="Increased Conversions 35% with Custom Analytics and A/B Testing"
        description="jago pasang cookies untuk ngetrack button, links, behavior lainnya, jago pasang GA 4, Jago a b testing pakai data"
        link="#"
        darkVideo="/casestudy-2-b.webm"
        lightVideo="/casestudy-2-w.webm"
      />
      <CaseStudySection
        title="Increased Conversions 35% with Custom Analytics and A/B Testing"
        description="jago pasang cookies untuk ngetrack button, links, behavior lainnya, jago pasang GA 4, Jago a b testing pakai data"
        link="#"
        darkVideo="/casestudy-1-b.webm"
        lightVideo="/casestudy-1-w.webm"
      />

      {/* About me */}
      <section className="flex-wrap max-w-480 items-start">
        <MotionDiv styles="relative flex-1 aspect-3/4 min-w-90 max-w-170">
          <AboutImage />
          <div className="absolute z-10 inset-0 bg-[radial-gradient(farthest-side_at_center,#12121200_90%,var(--black)_100%)]" />
          <svg
            className="absolute w-full aspect-square -bottom-16 z-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 524 524">
            <path stroke="var(--divider)" d="M0 524 524 0M183.704 373l196-196" />
          </svg>
        </MotionDiv>

        <MotionDiv
          variant='right'
          del={0.5}
          styles="flex-1 min-w-90 mt-10 max-w-170">
          <p>
            With a mixed background in design and coding, I have a solid foundation to make a step up as a UX Engineer. I'm responsible in building design systems, advocating user experience, and ensuring scalable business. I'm highly data-driven, I use tracking tools to analyze user behavior and collect non-sensitive data. I rely heavily on data to understand how people actually behave, not just how we think they do. My role has always been about connecting the dots: between developers, users, and business, I'm the bridge.<br /><br />
            If you’re interested in the software and hardware I use, you may check out my uses page. Meanwhile, you can also explore my other passion in music composing piano music. I'm an ex Dota 2 addict, if ever also played Dota 2 you might want to find a hidden easter egg in this website that only Dota players will recognize. Let’s find that easter egg.<br /><br />
          </p>
        </MotionDiv>
      </section>
    </main>
  );
}