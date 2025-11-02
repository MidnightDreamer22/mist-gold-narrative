import CinematicPane from '../CinematicPane';
import FrostCard from '../FrostCard';
import aboutBg from '@/assets/about-background.jpg';

const AboutPanel = () => {
  return (
    <section className="snap-section grid md:grid-cols-2 min-h-screen">
      <CinematicPane imageUrl={aboutBg} />
      
      <div className="flex items-center justify-center p-8 md:p-12 bg-ink-900">
        <div className="section-content max-w-xl">
          <FrostCard>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-display text-mist-100 mb-8">
                Our Story
              </h2>
              
              <div className="prose prose-invert max-w-none space-y-4 text-mist-300">
                <p className="text-lg leading-relaxed">
                  <strong>DOCX Story Content Placeholder</strong>
                </p>
                
                <p className="leading-relaxed">
                  This section will display the story content from your DOCX file. 
                  The content should include the Simona origin story, "Spirit of the City" narrative, 
                  and brand philosophy.
                </p>
                
                <p className="leading-relaxed">
                  Content will be imported from the DOCX file and rendered here with proper 
                  typographic hierarchy, preserving headings, paragraphs, lists, and emphasis 
                  while maintaining the noir/minimal aesthetic.
                </p>
                
                <div className="mt-8 p-4 border border-gold-400/20 rounded bg-ink-700/50">
                  <p className="text-sm text-gold-400">
                    📄 To add your story: Upload your DOCX file and the content will automatically 
                    replace this placeholder with proper formatting.
                  </p>
                </div>
              </div>
            </div>
          </FrostCard>
        </div>
      </div>
    </section>
  );
};

export default AboutPanel;
