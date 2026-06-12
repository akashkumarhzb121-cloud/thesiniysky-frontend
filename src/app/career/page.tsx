import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function CareerPage() {
  const jobs = [
    { title: 'Senior React Developer', type: 'Full-time', location: 'Remote' },
    { title: 'UI/UX Designer', type: 'Full-time', location: 'New York' },
    { title: 'DevOps Engineer', type: 'Contract', location: 'Remote' },
  ];

  return (
    <>
      <PublicHeader />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Career Opportunities</h1>
            <p className="text-xl text-gray-600">Join our team and build the future of SaaS.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {jobs.map(job => (
              <div key={job.title} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.type} • {job.location}</p>
                </div>
                <a href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Apply</a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
