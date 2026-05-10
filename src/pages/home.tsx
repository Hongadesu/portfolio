import { useData } from '@/hooks/useData';
import { Cursor, CursorProvider } from '@/modules/cursor';
import { Navbar } from '@/components/navbar';
import { Header } from '@/components/header';
import { AboutMe } from '@/components/aboutme-section';
import { ProjectSection } from '@/components/project-section';
import { ExperimentSection } from '@/components/experiment-section';

function Home() {
  const { info } = useData();

  return (
    <CursorProvider>
      <div className='flex min-h-full flex-col items-center gap-9 bg-(--background) text-(--on-background)'>
        {/* navbar (sticky) */}
        <Navbar />
        {/* header */}
        <Header
          name={info.name}
          label={info.label}
          tags={info.skillTags}
          headImg={info.headImg}
          headBgImg={info.headBgImg}
          className='-mt-9 mb-16 px-9'
        />
        {/* About Me Section */}
        <AboutMe
          selfDescription={info.selfDescription}
          className='mb-16 w-full max-w-5xl overflow-hidden px-6'
        />
        {/* Projects Section */}
        <ProjectSection
          projects={info.projects}
          className='mb-16 w-full max-w-7xl overflow-hidden px-6'
        />
        {/* Experiments Section */}
        <ExperimentSection
          experiments={info.experiments}
          className='mb-16 w-full max-w-5xl overflow-hidden px-8'
        />
      </div>
      <Cursor />
    </CursorProvider>
  );
}

export default Home;
