import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy – Simona Bar';
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 pt-24 pb-20 px-6">
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-display text-mist-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-mist-300 text-sm">
            Last updated: 1 December 2024
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-mist-300">
          <p className="text-lg leading-relaxed">
            This Privacy Policy explains how Simona Bar ("we", "us", "our") collects, uses, and protects information when you visit our website <span className="text-gold-400">simona.bar</span> and when you contact us for reservations or questions.
          </p>
          
          <p>
            By using this website, you agree to the terms of this Privacy Policy.
          </p>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">1. Who we are</h2>
            <p>
              Simona Bar is a cocktail and listening bar located in Yerevan, Armenia.
            </p>
            <p>
              If you have any questions about this Privacy Policy, you can contact us at:
            </p>
            <ul className="list-none space-y-2 mt-4 pl-0">
              <li>Email: <a href="mailto:cheers@simona.bar" className="text-gold-400 hover:text-gold-300 underline">cheers@simona.bar</a></li>
              <li>Instagram: <a href="https://www.instagram.com/simonagathers/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline">@simonagathers</a></li>
              <li>Facebook: <a href="https://www.facebook.com/simonabarhome/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline">Simona Bar</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">2. Information we collect</h2>
            <p>We collect two types of information:</p>
            
            <h3 className="text-2xl font-display text-mist-100 mt-8 mb-3">2.1. Information you provide directly</h3>
            <p>
              When you fill out forms on our website (for example, reservation or contact forms), you may provide:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and surname</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Preferred date, time, and group size for reservation</li>
              <li>Any additional message you choose to write</li>
            </ul>

            <h3 className="text-2xl font-display text-mist-100 mt-8 mb-3">2.2. Information collected automatically</h3>
            <p>
              When you browse our website, some information may be collected automatically, such as:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and approximate location</li>
              <li>Device and browser type</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring website (if you came from another link)</li>
            </ul>
            <p>
              This is usually collected through cookies or similar technologies and may be used for basic analytics.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">3. How we use your information</h2>
            <p>
              We use your information only for purposes connected to our bar, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Reading and responding to reservation requests and other messages</li>
              <li>Contacting you with confirmation or follow-up questions</li>
              <li>Improving our website and understanding how visitors use it (analytics)</li>
              <li>Maintaining the security and performance of the site</li>
            </ul>
            <p className="font-semibold text-gold-400">
              We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">4. Legal basis for processing</h2>
            <p>
              We process your personal data based on:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Your consent</strong> – for example, when you submit a form on our website</li>
              <li><strong>Our legitimate interest</strong> – to run and promote our bar, answer messages, and improve our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">5. Cookies and analytics</h2>
            <p>
              Our website may use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Remember basic preferences</li>
              <li>Collect anonymous statistics about how visitors use the site</li>
            </ul>
            <p>
              If we use third-party tools (for example, Google Analytics or social media pixels), they may also place cookies in your browser under their own privacy policies.
            </p>
            <p>
              You can control or delete cookies through your browser settings. If you disable cookies, some parts of the site may not work perfectly, but the main content will still be available.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">6. How we share your information</h2>
            <p>
              We may share your information only with:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Service providers that help us operate the website or handle forms (for example, email or form services)</li>
              <li>Authorities, if required by law or to protect our rights, safety, or property</li>
            </ul>
            <p>
              We do not share your personal data with third parties for the purpose of selling data or creating unrelated marketing lists.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">7. Data storage and security</h2>
            <p>
              We take reasonable technical and organizational measures to protect your data from unauthorized access, loss, misuse, or alteration.
            </p>
            <p>
              We keep your personal data only as long as necessary for the purposes described in this Policy – for example, to manage reservations or respond to your messages. After that, we delete or anonymize the data, unless we are required by law to keep it longer.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">8. Your rights</h2>
            <p>
              Depending on your local laws, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Ask us to correct inaccurate or incomplete data</li>
              <li>Ask us to delete your personal data</li>
              <li>Object to or limit certain types of processing</li>
              <li>Withdraw your consent (for example, to stop receiving direct messages)</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:cheers@simona.bar" className="text-gold-400 hover:text-gold-300 underline">cheers@simona.bar</a>.
            </p>
            <p>
              We may ask you to confirm your identity before responding.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">9. Third-party links and embeds</h2>
            <p>
              Our website may contain links to other websites or embedded content (for example, maps, music players, or social media widgets). These third-party sites and services have their own privacy policies, and we are not responsible for how they handle your data.
            </p>
            <p>
              We encourage you to read the privacy policies of any external sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">10. Children and age restrictions</h2>
            <p>
              Our bar serves alcoholic beverages and is intended for visitors who are of legal drinking age under the laws of Armenia.
            </p>
            <p>
              This website is not designed to knowingly collect personal data from children. If you believe that a child has provided personal data to us, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-display text-mist-100 mt-12 mb-4">11. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated "Last updated" date.
            </p>
            <p>
              If you have any questions about this Policy, contact us at <a href="mailto:cheers@simona.bar" className="text-gold-400 hover:text-gold-300 underline">cheers@simona.bar</a>.
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className="inline-block text-gold-400 hover:text-gold-300 transition-colors underline"
          >
            ← Back to Home
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Privacy;
