import LanguageToggle from "@/components/LanguageToggle";
import ContactForm from "@/components/ContactForm";

type Profile = {
  name: string;
  title: string;
  bio: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string;
  repoUrl: string;
};

const API = "http://localhost:8080/api";

async function getProfile(lang: string): Promise<Profile> {
  const res = await fetch(`${API}/profile?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

async function getProjects(lang: string): Promise<Project[]> {
  const res = await fetch(`${API}/projects?lang=${lang}`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang = "de" } = await searchParams;
  const [profile, projects] = await Promise.all([
    getProfile(lang),
    getProjects(lang),
  ]);

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8 flex flex-col gap-10">
      <div className="flex justify-end">
        <LanguageToggle current={lang} />
      </div>

      <section className="text-center flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{profile.name}</h1>
        <p className="text-lg text-gray-600">{profile.title}</p>
        <p className="text-gray-800">{profile.bio}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        {projects.map((project) => (
          <article
            key={project.id}
            className="border rounded-lg p-4 flex flex-col gap-2"
          >
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
            <p className="text-sm text-gray-500">{project.techStack}</p>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View on GitHub →
            </a>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <ContactForm />
      </section>
    </main>
  );
}