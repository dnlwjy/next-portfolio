import Ava from '../components/Ava'
import MotionDiv from '../components/MotionDiv'
import LinkButton from '../components/LinkButton'
import CaseStudySection from '../components/CaseStudySection'
import AboutImage from '../components/AboutImage'
import { client } from '../sanity/client'
import A from '../components/A'

const query = `*[_type == "projects" && featured == true] | order(orderRank asc) {
  _id,
  title,
  description,
  slug,
}`

export default async function Home() {
  const caseStudies = await client.fetch(query)

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
        title={caseStudies[0].title}
        description={caseStudies[0].description}
        link={`/case-study/${caseStudies[0].slug.current}`}
        video="/cs1.webm"
      />
      <CaseStudySection
        variant="type B"
        title={caseStudies[1].title}
        description={caseStudies[1].description}
        link={`/case-study/${caseStudies[1].slug.current}`}
        video="/cs2.webm"
      />
      <CaseStudySection
        title={caseStudies[2].title}
        description={caseStudies[2].description}
        link={`/case-study/${caseStudies[2].slug.current}`}
        video="/cs1.webm"
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
            I currently work at <A link="https://www.told.co.nz/" title="Told" /> remotely as a UI designer and Framer developer. I enjoy taking time to understand how things move, how people think, to help shape me and the products I bring to life. Outside work, I build my own projects and make <A link="https://open.spotify.com/artist/0VyiZOjAOfYc0gV7EbT4v0" title="new-age music" /> for piano and strings.<br /><br />
            I specialize in design-to-code implementation and responsible to shape the business and making the business scalable. Though I might be associated with frontends, I'm highly data-driven. I use data to analyze people's behavior and understand how things move, not just how we think. My expertise lies in building design systems, advocating user experience (UX), and ensuring scalable business. My role has always been about connecting the dots between designers, developers, users, and business.<br /><br />
            I am currently available for a full-time role for UX engineer role in probably in Australia or Singapore. If you’re interested in the software and hardware I use, you may check out my <A link="/resources" title="resources page" />.
          </p>
        </MotionDiv>
      </section>
    </main>
  );
}